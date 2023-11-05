from sqlalchemy.orm import Session

from app.models.event import SqlEvent, EventCreate


async def create_event(db: Session, payload: EventCreate) -> SqlEvent:
    """Создание мероприятия"""
    db_event = SqlEvent(**payload.model_dump())

    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


async def get_events(db: Session) -> list[SqlEvent]:
    """Получение всех мероприятий"""
    events = db.query(SqlEvent).all()
    return events


