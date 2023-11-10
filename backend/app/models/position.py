import typing as tp
from pydantic import BaseModel, ConfigDict, Field

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Text, ForeignKey

from .base import Base

if tp.TYPE_CHECKING:
    from .user import SqlUser
    from .course import SqlCourse


class PositionBase(BaseModel):
    name: str = Field(...)


class PositionCreate(PositionBase):
    ...


class PositionDto(PositionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)


class SqlPosition(Base):
    __tablename__ = "positions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)

    users: Mapped["SqlUser"] = relationship("SqlUser", back_populates="position")
    courses: Mapped[list["SqlCourse"]] = relationship(
        "SqlCourse", secondary="position_course"
    )


class PositionCourse(Base):
    __tablename__ = "position_course"

    position_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("positions.id"),
        primary_key=True,
    )
    course_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("courses.id"),
        primary_key=True,
    )


# interest_user = sqlalchemy.Table(
#     "interest_user",
#     Base.metadata,
#     sqlalchemy.Column(
#         "interest_id", Integer, ForeignKey("interest.id"), primary_key=True
#     ),
#     sqlalchemy.Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
# )
