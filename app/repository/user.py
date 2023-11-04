import abc

from app.models.user import User, UserCreate, UserDto
from sqlalchemy.orm import Session


class AbstractUserRepo(abc.ABC):
    @abc.abstractmethod
    async def create_user(self, payload: UserCreate) -> UserDto:
        raise NotImplementedError

    @abc.abstractmethod
    async def get_user(
        self,
        _id: int | None = None,
        first_name: str | None = None,
        last_name: str | None = None,
        middle_name: str | None = None,
        email: str | None = None,
    ) -> UserDto:
        raise NotImplementedError

    @abc.abstractmethod
    async def get_users(
        self,
        first_name: str | None = None,
        last_name: str | None = None,
        middle_name: str | None = None,
        role_id: int | None = None,
    ) -> list[UserDto]:
        raise NotImplementedError


class SqlUserRepo(AbstractUserRepo):
    def __init__(self, db: Session) -> None:
        self.session = db

    async def create_user(self, payload: UserCreate) -> UserDto:

        db_user = User(**payload.model_dump())
        self.session.add(db_user)
        self.session.commit()
        return UserDto.model_validate(db_user)

    async def get_user(
        self,
        _id: int | None = None,
        first_name: str | None = None,
        last_name: str | None = None,
        middle_name: str | None = None,
        email: str | None = None,
    ) -> UserDto:
        query = self.session.query(User)
        # FIXME: как сделать это красиво?
        if _id:
            query = query.filter(User.id == _id)
        if first_name:
            query = query.filter(User.first_name == first_name)
        if last_name:
            query = query.filter(User.last_name == last_name)
        if middle_name:
            query = query.filter(User.middle_name == middle_name)
        if email:
            query = query.filter(User.email == email)
        db_user = query.first()
        return UserDto.model_validate(db_user)

    async def get_users(
        self,
        first_name: str | None = None,
        last_name: str | None = None,
        middle_name: str | None = None,
        role_id: int | None = None,
    ) -> list[UserDto]:
        query = self.session.query(User)
        if first_name:
            query = query.filter(User.first_name == first_name)
        if last_name:
            query = query.filter(User.last_name == last_name)
        if middle_name:
            query = query.filter(User.middle_name == middle_name)
        if role_id:
            query = query.filter(User.role_id == role_id)
        db_users = query.all()
        return [UserDto.model_validate(db_user) for db_user in db_users]
