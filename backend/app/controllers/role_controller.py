from sqlalchemy.orm import Session
from app.models.role import RoleCreate, RoleDto
from app import crud


class RoleController:
    def __init__(self, db: Session) -> None:
        self.db = db

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
