from sqlalchemy.orm import Session

from app import crud
from app.models.action import ActionCreate, ActionType
from app.models.event import EventCreate, EventDto


class EventController:
    # FIX_ME добавить event_type в бд
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_events(self, user_id: int = None) -> list[EventDto]:
        db_events = await crud.event.get_events(self.db)
        events = [EventDto.model_validate(obj) for obj in db_events]
        if user_id:
            event_ids = set(await crud.event.get_events_for_user(self.db, user_id))

            for event in events:
                if event.id in event_ids:
                    event.is_enrolled = True

        return events

    async def create_event(self, payload: EventCreate) -> EventDto:
        db_event = await crud.event.create_event(self.db, payload)
        return EventDto.model_validate(db_event)

    async def enroll_on_event(self, event_id: int, user_id: int) -> bool:
        db_event = await crud.event.enroll_on_event(self.db, event_id, user_id)
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.enroll_on_event, user_id=user_id))
        return True

    async def delete_event(self, event_id: int):
        await crud.event.delete_event(self.db, event_id)

    async def change_event(self, event_id: int, payload: EventCreate) -> EventDto:
        db_event = await crud.event.change_event(self.db, event_id, payload)
        return EventDto.model_validate(db_event)
