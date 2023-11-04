import abc

from fastapi import Depends

from app.models.role import Role, RoleCreate, RoleDto

from sqlalchemy.orm import Session
from sqlalchemy.orm import Query

from app.core.sql import db


class AbstractRoleRepo(abc.ABC):
    @abc.abstractmethod
    async def create_role(self, payload: RoleCreate) -> RoleDto:
        raise NotImplementedError

    @abc.abstractmethod
    async def get_role(
        self,
        role_id: int | None = None,
        name: str | None = None,
    ) -> RoleDto:
        raise NotImplementedError


class SqlRoleRepo(AbstractRoleRepo):
    def __init__(self, db: Session) -> None:
        self.session = db

    async def create_role(self, payload: RoleCreate) -> RoleDto:
        db_role = Role(**payload.model_dump())
        self.session.add(db_role)
        self.session.commit()
        return RoleDto.model_validate(db_role)

    async def get_role(
        self,
        role_id: int | None = None,
        name: str | None = None,
    ) -> RoleDto:
        query: Query = self.session.query(Role)
        if role_id:
            query = query.filter(Role.id == role_id)
        if name:
            query = query.filter(Role.name == name)
        db_role = query.first()
        return RoleDto.model_validate(db_role)
