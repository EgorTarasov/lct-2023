from pydantic import BaseModel
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, Text, ForeignKey

from .base import Base


class TelegramLoginData(BaseModel):
    id: int
    first_name: str
    last_name: str | None = None
    username: str | None = None
    photo_url: str | None = None
    auth_date: int
    hash: str


class SqlTelegram(Base):
    __tablename__ = "telegram"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    first_name: Mapped[str] = mapped_column(Text)
    last_name: Mapped[str] = mapped_column(Text, nullable=True)
    username: Mapped[str] = mapped_column(Text, nullable=True)
    photo_url: Mapped[str] = mapped_column(Text, nullable=True)
    auth_date: Mapped[int] = mapped_column(Integer)
