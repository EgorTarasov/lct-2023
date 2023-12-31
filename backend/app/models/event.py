from pydantic import BaseModel, ConfigDict
from sqlalchemy import Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import mapped_column, Mapped, relationship
import datetime as dt

from app.models.base import Base


class EventCreate(BaseModel):
    title: str
    place: str
    type_id: int
    duration: int = 0
    points: int = 0
    starts_at: dt.datetime


class EventTypeDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str


class EventDto(EventCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    is_enrolled: bool = False
    event_type: EventTypeDto


class SqlEvent(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(Text)
    place: Mapped[str] = mapped_column(Text)
    duration: Mapped[int] = mapped_column(Integer)  # продолжительность в часах
    points: Mapped[int] = mapped_column(Integer)  # баллы за поход на мероприятие

    starts_at: Mapped[dt.datetime] = mapped_column(DateTime)
    type_id: Mapped[int] = mapped_column(ForeignKey("event_type.id"), nullable=False)

    event_type = relationship("SqlEventType")


class SqlEnrollment(Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)

    event_id: Mapped[int] = mapped_column(ForeignKey("events.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    event = relationship("SqlEvent")
    user = relationship("SqlUser")


class SqlEventType(Base):
    __tablename__ = "event_type"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
