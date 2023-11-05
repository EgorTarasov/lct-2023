from sqlalchemy.orm import Session
from app.models.role import SqlRole, RoleCreate, RoleDto


async def create_role(db: Session, payload: RoleCreate) -> SqlRole:
    role = SqlRole(**payload.model_dump())
    db.add(role)
    db.commit()
    db.refresh(role)
    return role


async def get_roles(db: Session) -> list[SqlRole]:
    return db.query(SqlRole).all()
