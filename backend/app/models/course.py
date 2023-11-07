import typing as tp
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Text, ForeignKey

from .base import Base

if tp.TYPE_CHECKING:
    from .position import SqlPosition

from .skill import SqlSkill, SkillDto


class BaseCourse(BaseModel):
    name: str = Field(...)
    duration: int = Field(...)


class CourseCreate(BaseCourse):
    ...


class CourseDto(BaseCourse):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)
    skills: list[SkillDto] = Field(...)


class SqlCourse(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    duration: Mapped[int] = mapped_column(Integer)  # продолжительность в стори поинтах

    skills: Mapped[list["SqlSkill"]] = relationship("SqlSkill", back_populates="course")
    positions: Mapped[list["SqlPosition"]] = relationship(
        "SqlPosition", secondary="position_course"
    )
