import typing as tp
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Text, ForeignKey

from app.models.file import FileDto, SqlFile

from .base import Base
from .quiz import SqlQuiz, QuizDescription

if tp.TYPE_CHECKING:
    from .position import SqlPosition


class BaseCourse(BaseModel):
    name: str = Field(...)
    duration: int = Field(...)


class CourseCreate(BaseCourse):
    quzes: list[int] = []


class CourseDto(BaseCourse):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)
    quizes: list[QuizDescription] = Field(...)
    files: list[FileDto] = Field(...)


class SqlCourse(Base):
    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    name: Mapped[str] = mapped_column(Text)
    duration: Mapped[int] = mapped_column(Integer)  # продолжительность в стори поинтах

    positions: Mapped[list["SqlPosition"]] = relationship(
        "SqlPosition", secondary="position_course"
    )

    quizes: Mapped[list[SqlQuiz]] = relationship(SqlQuiz, secondary="quiz_course")

    files: Mapped[list[SqlFile]] = relationship(SqlFile, secondary="file_course")


class QuizCourse(Base):
    __tablename__ = "quiz_course"

    course_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("courses.id"), primary_key=True
    )
    quiz_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz.id"), primary_key=True
    )


class FileCourse(Base):
    __tablename__ = "file_course"

    course_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("courses.id"), primary_key=True
    )
    file_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("file.id"), primary_key=True
    )
