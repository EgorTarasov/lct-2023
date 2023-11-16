from pydantic import BaseModel, ConfigDict
from sqlalchemy import Integer, Text
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base


class FileBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    path: str
    duration: int = 0


class FileDto(FileBase):
    id: int


class SqlFile(Base):
    __tablename__ = "file"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text)
    path: Mapped[str] = mapped_column(Text)
    duration: Mapped[int] = mapped_column(Integer, default=0)
