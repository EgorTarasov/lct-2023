import typing as tp
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import JSON, Integer, Text, ForeignKey

if tp.TYPE_CHECKING:
    from app.models.user import SqlUser

from .base import Base

from .skill import SqlSkill


class QuestionBase(BaseModel):
    skill_id: int = Field(...)
    description: str = Field(...)
    answer: dict = Field(...)


class QuestionCreate(QuestionBase):
    ...


class QuestionDto(QuestionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)


class SqlQuestion(Base):
    __tablename__ = "questions"
    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    skill_id: Mapped[int] = mapped_column(Integer, ForeignKey("skills.id"))
    description: Mapped[str] = mapped_column(Text)
    answer: Mapped[dict] = mapped_column(JSON)

    skill: Mapped[SqlSkill] = relationship(SqlSkill, back_populates="questions")


class QuestinSubmissionBase(BaseModel):
    answer: dict = Field(...)


class QuestionSubmissionCreate(QuestinSubmissionBase):
    model_config = ConfigDict(from_attributes=True)
    user_id: int
    question_id: int = Field(...)


class QuestinSubmissionDto(QuestinSubmissionBase):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(...)
    user_id: int = Field(...)
    question_id: int = Field(...)


class SqlQuestionSubmission(Base):
    __tablename__ = "question_submissions"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    question_id: Mapped[int] = mapped_column(Integer, ForeignKey("questions.id"))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    answer: Mapped[dict] = mapped_column(JSON)

    user: Mapped["SqlUser"] = relationship("SqlUser")
