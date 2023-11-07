import typing as tp
from pydantic import BaseModel, ConfigDict, Field

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Text, ForeignKey

from .base import Base

if tp.TYPE_CHECKING:
    from .user import SqlUser
    from .course import SqlCourse


class FileDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    filename: str
    url: str = ""


class SqlFile(Base):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    filename: Mapped[str] = mapped_column(Text)
    positions: Mapped[list["SqlPosition"]] = relationship(
        "SqlPosition", secondary="position_file"
    )


class SqlPositionFile(Base):
    __tablename__ = "position_file"

    position_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("positions.id"),
        primary_key=True,
    )
    file_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("files.id"),
        primary_key=True,
    )
