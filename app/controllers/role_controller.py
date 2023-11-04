from sqlalchemy.orm import Session
from app.models.role import RoleCreate, RoleDto
from app.repository import SqlRoleRepo


class RoleController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_role(self, payload: RoleCreate) -> RoleDto | None:
        try:
            return await SqlRoleRepo(self.db).create_role(payload)
        except Exception as e:
            raise e

    async def get_avaliable_roles(self) -> list[RoleDto]:
        try:
            return await SqlRoleRepo(self.db).get_roles()
        except Exception as e:
            raise e
