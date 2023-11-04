from sqlalchemy.orm import Session
from app.models.role import SqlRole, RoleCreate, RoleDto


async def create_role(db: Session, payload: RoleCreate) -> RoleDto:
    role = SqlRole(**payload.model_dump())
    db.add(role)
    db.commit()
    db.refresh(role)
    return RoleDto.model_validate(role)


async def get_roles(db: Session) -> list[RoleDto]:
    return [RoleDto.model_validate(role) for role in db.query(SqlRole).all()]
