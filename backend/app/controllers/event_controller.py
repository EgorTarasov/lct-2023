from sqlalchemy.orm import Session

from app import crud
from app.models.event import EventCreate, EventDto


class EventController:
    # FIX_ME добавить event_type в бд
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_events(self) -> list[EventDto]:
        return await crud.event.get_events(self.db)

    async def create_event(self, payload: EventCreate) -> EventDto:
        return await crud.event.create_event(self.db, payload)
