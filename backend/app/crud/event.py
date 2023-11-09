from sqlalchemy.orm import Session

from app.models.event import SqlEvent, EventCreate, SqlEnrollment, SqlEventType
from app.models.user import SqlUser


async def create_event(db: Session, payload: EventCreate) -> SqlEvent:
    """Создание мероприятия"""
    db_event = SqlEvent(**payload.model_dump())

    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


async def get_events(db: Session) -> list[SqlEvent]:
    """Получение всех мероприятий"""
    events = db.query(SqlEvent).order_by(SqlEvent.starts_at.desc()).all()
    return events


async def get_events_for_user(db: Session, user_id: int) -> list[int]:
    """Получение всех мероприятий для пользователя"""
    # events = db.query(SqlEvent).join(SqlEnrollment, SqlEvent.id == SqlEnrollment.id).all()
    user = db.query(SqlUser).filter(SqlUser.id == user_id).one_or_none()
    if not user:
        raise Exception("Пользователя не существует")
    return [event.id for event in user.events]


async def enroll_on_event(db: Session, event_id: int, user_id: int) -> SqlEnrollment:
    """Запись на мероприятие"""
    existed_enrollment = db.query(SqlEnrollment).where(SqlEnrollment.event_id == event_id,
                                                       SqlEnrollment.user_id == user_id).one_or_none()
    if existed_enrollment:
        raise Exception("Вы уже записаны на мероприятие")
    db_enrollment = SqlEnrollment(event_id=event_id, user_id=user_id)

    db.add(db_enrollment)
    db.commit()
    db.refresh(db_enrollment)
    return db_enrollment


async def get_available_event_types(db: Session) -> list[str]:
    """Получение всех типов мероприятий"""
    event_types = db.query(SqlEventType, SqlEventType.name).all()
    return [event_type.name for event_type in event_types]


async def delete_event(db: Session, event_id: int):
    """Получение всех мероприятий"""
    deleted_rows = db.query(SqlEvent).where(SqlEvent.id == event_id).delete()
    if deleted_rows == 0:
        raise Exception("Такого типа не существует")
    db.commit()


async def change_event(db: Session, event_id: int, payload: EventCreate) -> SqlEvent:
    """Получение всех мероприятий"""
    db_event = db.query(SqlEvent).where(SqlEvent.id == event_id).one_or_none()
    if not db_event:
        raise Exception("Такого мероприятия не существует")
    for key, value in payload.model_dump().items():
        setattr(db_event, key, value) if value else None
    db.commit()
    db.refresh(db_event)
    return db_event