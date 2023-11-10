from enum import Enum

from pydantic import BaseModel, ConfigDict
from sqlalchemy import Integer, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import mapped_column, Mapped, relationship
import datetime as dt

from app.models.base import Base
from app.models.user import UserDto


class ActionType(str, Enum):
    registration = "Пользователь зарегистрирован"
    login = "Пользователь вошёл в аккаунт"
    enroll_on_event = "Пользователь записался на мероприятие"
    submit_answer = "Пользователь ответил на вопрос в тесте"
    update_task_status = "Пользователь изменил статус задачи"
    update_interests = "Пользователь изменил свои интересы"


class ActionCreate(BaseModel):
    action: str
    data: dict[str, str] = {}
    user_id: int


class ActionDto(ActionCreate):
    model_config = ConfigDict(from_attributes=True)
    created_at: dt.datetime
    user: UserDto


class SqlAction(Base):
    __tablename__ = "actions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    action: Mapped[ActionType] = mapped_column(Text)
    data: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    user = relationship("SqlUser")

