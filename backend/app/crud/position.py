from sqlalchemy.orm import Session
from app.models.position import SqlPosition, PositionCreate


async def create(db: Session, position: PositionCreate) -> SqlPosition:
    db_position = SqlPosition(**position.model_dump())
    db.add(db_position)
    db.commit()
    db.refresh(db_position)
    return db_position


async def get_position_by_name(db: Session, name: str) -> SqlPosition:
    # TODO pagination
    position = db.query(SqlPosition).filter(SqlPosition.name == name).one_or_none()
    if not position:
        raise Exception("Должности не существует")
    return position


async def get_all(db: Session) -> list[SqlPosition]:
    # TODO pagination
    return db.query(SqlPosition).all()
