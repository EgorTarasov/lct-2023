from sqlalchemy.orm import Session

from app.auth.jwt import UserTokenData
from app.models.interest import InterestDto, InterestUpdate
from app.models.token import Token
from app.models.user import UserCreate, UserDto, UserLogin
from app.models.position import PositionCreate, PositionDto
from app.models.role import RoleCreate, RoleDto


from app.auth import PasswordManager, JWTEncoder
from app import crud


class UserController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_user(self, payload: UserCreate) -> UserDto | None:

        payload.password = PasswordManager.hash_password(payload.password)
        try:
            return UserDto.model_validate(await crud.user.create_user(self.db, payload))
        except Exception as e:
            raise e

    async def authenticate_user(self, payload: UserLogin) -> Token:
        user = await crud.user.get_user_by_email(self.db, payload.email)
        if not user:
            raise Exception("User not found")
        if not PasswordManager.verify_password(payload.password, user.password):
            raise Exception("Incorrect password")
        return Token(
            access_token=JWTEncoder.create_access_token(
                user.id, user.email, user.role_id
            ),
            token_type="bearer",
        )

    async def update_interest(
        self, user: UserTokenData, payload: InterestUpdate
    ) -> list[InterestDto]:
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
        avaliable_interests = await crud.interest.get_avaliable_interests(self.db)
        return [InterestDto.model_validate(obj) for obj in avaliable_interests]

    async def create_position(self, position: PositionCreate) -> PositionDto:
        db_position = await crud.position.create(self.db, position)
        return PositionDto.model_validate(db_position)

    async def get_positions(self) -> list[PositionDto]:
        db_positions = await crud.position.get_all(self.db)
        return [PositionDto.model_validate(db_position) for db_position in db_positions]

    async def create_role(self, payload: RoleCreate) -> RoleDto | None:
        try:
            return RoleDto.model_validate(await crud.role.create_role(self.db, payload))
        except Exception as e:
            raise e

    async def get_avaliable_roles(self) -> list[RoleDto]:
        try:
            return [
                RoleDto.model_validate(obj)
                for obj in await crud.role.get_roles(self.db)
            ]
        except Exception as e:
            raise e
