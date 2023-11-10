import datetime

from sqlalchemy.orm import Session
import logging

from app.auth.jwt import UserTokenData
from app.config import config
from app.models.action import ActionCreate, ActionType
from app.models.interest import InterestDto, InterestUpdate
from app.models.token import Token
from app.models.user import UserCreate, UserDto, UserLogin, UserTeam
from app.models.position import PositionCreate, PositionDto
from app.models.role import RoleCreate, RoleDto
from app.auth import PasswordManager, JWTEncoder
from app import crud
from app.worker import notify_user_about_registration


class UserController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_user(self, payload: UserCreate) -> UserDto | None:
        password = PasswordManager.generate_password()
        try:
            user = crud.user.create_user(self.db, payload, password=password)
            logging.info(f"User {user.email} created with password {password}")
            notify_user_about_registration.delay(
                fullname=f"{user.last_name} {user.first_name} {user.middle_name}",
                email=user.email, password=password
            )
            return UserDto.model_validate(user)
        except Exception as e:
            raise e

    async def authenticate_user(self, payload: UserLogin) -> Token:
        user = crud.user.get_user_by_email(self.db, payload.email)
        if not user:
            raise Exception("User not found")
        if not PasswordManager.verify_password(payload.password, user.password):
            raise Exception("Incorrect password")
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.login, user_id=user.id))
        return Token(
            access_token=JWTEncoder.create_access_token(
                user.id, user.email, user.role_id
            ),
            token_type="bearer",
        )

    async def update_interest(
            self, user: UserTokenData, payload: InterestUpdate
    ) -> list[InterestDto]:
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.update_interests, user_id=user.user_id))
        return [
            InterestDto.model_validate(obj)
            for obj in await crud.interest.update_user_interests(
                self.db, user.user_id, payload.interests_ids
            )
        ]

    async def get_users_interests(self, user: UserTokenData) -> list[InterestDto]:
        user_interests = await crud.interest.get_user_interests(self.db, user.user_id)
        return [InterestDto.model_validate(obj) for obj in user_interests]

    async def get_avaliable_interest(self) -> list[InterestDto]:
        avaliable_interests = await crud.interest.get_available_interests(self.db)
        return [InterestDto.model_validate(obj) for obj in avaliable_interests]

    async def create_position(self, position: PositionCreate) -> PositionDto:
        db_position = await crud.position.create(self.db, position)
        return PositionDto.model_validate(db_position)

    async def get_positions(self) -> list[PositionDto]:
        db_positions = await crud.position.get_all(self.db)
        return [PositionDto.model_validate(db_position) for db_position in db_positions]

    async def prepare_test_users(self):
        try:
            users = [
                UserCreate(
                    first_name="Иван",
                    last_name="Иванов",
                    middle_name="Иванович",
                    email=config.admin_email,
                    adaptation_target=
                    "Актуализация/получение и закрепление навыков для выполнения должностных обязанностей.",
                    starts_work_at=datetime.date.today(),
                    role_id=1,
                    position_id=1,
                    number="88005553535",
                ),
                UserCreate(
                    first_name="Анастасия",
                    last_name="Белова",
                    middle_name="Сергеевна",
                    email=config.test_users["lead"],
                    adaptation_target="",
                    starts_work_at=datetime.date.today(),
                    role_id=2,
                    position_id=1,
                    number="+7 (999) 123-45-67",
                    password="UserExample"
                ),
                UserCreate(
                    first_name="Егор",
                    last_name="Муравьев",
                    middle_name="Павлович",
                    email=config.test_users["director"],
                    adaptation_target="",
                    starts_work_at=datetime.date.today(),
                    role_id=2,
                    position_id=1,
                    number="+7 (999) 765-43-21",
                    password="UserExample"
                ),
                UserCreate(
                    first_name="Максим",
                    last_name="Ледаков",
                    middle_name="Павлович",
                    email=config.test_users["team_1"],
                    adaptation_target="",
                    starts_work_at=datetime.date.today(),
                    role_id=2,
                    position_id=1,
                    number="+7 (999) 765-43-22",
                    password="UserExample"
                ),
                UserCreate(
                    first_name="Кузнецова",
                    last_name="Екатерина",
                    middle_name="Александровна",
                    email=config.test_users["team_2"],
                    adaptation_target="",
                    starts_work_at=datetime.date.today(),
                    role_id=2,
                    position_id=1,
                    number="+7 (999) 765-43-23",
                    password="UserExample"
                )
            ]
            crud.user.create_users(self.db, users, "stringst")
        except Exception as e:
            raise e

    async def get_my_team(self, user_id: int) -> UserTeam:
        try:
            user = await crud.user.get_user_by_id(self.db, user_id)
            team = UserTeam(
                lead=UserDto.model_validate(user.mentees[0] if user.mentees else
                                            crud.user.get_user_by_email(self.db, config.test_users["lead"])),
                director=UserDto.model_validate(crud.user.get_user_by_email(self.db, config.test_users["director"])),
                team=[UserDto.model_validate(crud.user.get_user_by_email(self.db, config.test_users["team_1"])),
                      UserDto.model_validate(crud.user.get_user_by_email(self.db, config.test_users["team_2"]))]
            )
            return team
        except Exception as e:
            raise e

    async def create_role(self, payload: RoleCreate) -> RoleDto | None:
        try:
            return RoleDto.model_validate(await crud.role.create_role(self.db, payload))
        except Exception as e:
            raise e

    async def get_available_roles(self) -> list[RoleDto]:
        try:
            return [
                RoleDto.model_validate(obj)
                for obj in await crud.role.get_roles(self.db)
            ]
        except Exception as e:
            raise e
