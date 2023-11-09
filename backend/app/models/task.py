from sqlalchemy import Integer, Text, JSON, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship
import datetime as dt
from pydantic import BaseModel, Field, ConfigDict
from enum import Enum
from .base import Base
from .user import SqlUser, UserDto


class TaskStatus(str, Enum):
    in_progress = "В процессе"
    finished = "Завершена"


class TaskType(str, Enum):
    adaptation = "Адаптация"
    work = "Работа"
    meeting = "Собрание"
    event = "Мероприятие"
    education = "Обучение"


class TaskCreate(BaseModel):
    name: str = Field(...)
    mentee_id: int = Field(...)
    deadline: dt.datetime = Field(...)
    status: TaskStatus = Field(...)
    type: TaskType = Field(...)
    difficulty: int = Field(...)
    points: int = Field(...)
    place: str = Field(...)
    links: list[str] = Field(...)


class TaskDto(TaskCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(...)
    mentor_id: int = Field(...)
    created_at: dt.datetime = Field(...)
    mentor: UserDto
    mentee: UserDto


class SqlTask(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    deadline: Mapped[dt.datetime] = mapped_column(DateTime)
    status: Mapped[TaskStatus] = mapped_column(Text)
    type: Mapped[TaskType] = mapped_column(Text)
    difficulty: Mapped[int] = mapped_column(Integer)
    points: Mapped[int] = mapped_column(Integer)
    place: Mapped[str] = mapped_column(Text)
    links: Mapped[list[str]] = mapped_column(JSON)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)

    mentee_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    mentor_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    mentee: Mapped[SqlUser] = relationship("SqlUser", foreign_keys=[mentee_id])
    mentor: Mapped[SqlUser] = relationship("SqlUser", foreign_keys=[mentor_id])

    # user = relationship("User", back_populates="user_role")
