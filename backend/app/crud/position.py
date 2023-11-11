from sqlalchemy.orm import Session
from app.models.position import PositionFile, SqlPosition, PositionCreate
from app.models.file import SqlFile


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


async def get_position_by_id(db: Session, id: int) -> SqlPosition:
    position = db.query(SqlPosition).filter(SqlPosition.id == id).one_or_none()
    if not position:
        raise Exception("Должности не существует")
    return position


async def add_files(db: Session, position_id: int, files: SqlFile) -> SqlPosition:
    position = await get_position_by_id(db, position_id)

    links = [
        PositionFile(
            position_id=position_id,
            file_id=file.id,
        )
        for file in files
    ]
    db.add_all(links)
    db.commit()
    db.refresh(position)
    return position


async def update(db: Session, position: SqlPosition):
    db.add(position)
    db.commit()
    db.refresh(position)
    return position


async def get_all(db: Session) -> list[SqlPosition]:
    # TODO pagination
    return db.query(SqlPosition).all()
