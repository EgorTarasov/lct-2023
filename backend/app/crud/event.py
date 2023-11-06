from sqlalchemy.orm import Session

from app.models.event import SqlEvent, EventCreate, SqlEnrollment
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

#
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
