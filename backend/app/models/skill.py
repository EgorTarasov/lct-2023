import typing as tp
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSON

from .base import Base

if tp.TYPE_CHECKING:
    from .course import SqlCourse
    from .question import SqlQuestion


class BaseSkill(BaseModel):
    course_id: int = Field(...)
    name: str = Field(...)
    article: str = Field(...)
    question: str = Field(...)
    answer: str = Field(...)


class SkillCreate(BaseSkill):
    ...


class SkillDto(BaseSkill):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)


class SqlSkill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    course_id: Mapped[int] = mapped_column(Integer, ForeignKey("courses.id"))
    name: Mapped[str] = mapped_column(Text, unique=True)
    article: Mapped[str] = mapped_column(Text)
    question: Mapped[str] = mapped_column(Text)
    answer: Mapped[dict] = mapped_column(JSON)

    course: Mapped["SqlCourse"] = relationship("SqlCourse", back_populates="skills")
    questions: Mapped[list["SqlQuestion"]] = relationship(
        "SqlQuestion", back_populates="skill"
    )
