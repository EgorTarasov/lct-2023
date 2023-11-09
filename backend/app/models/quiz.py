""" 
Описанное создание таблиц в базе данных PostgreSQL
"""

import typing as tp
import datetime as dt

from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import Integer, Boolean, ForeignKey, TIMESTAMP, Text
from pydantic import BaseModel, ConfigDict, Field


from .base import Base
from .user import SqlUser


class QuestionBase(BaseModel):

    model_config = ConfigDict(from_attributes=True)
    question_text: str
    answer: str


class QuestionDto(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "question_text": "Какой язык программирования самый популярный?",
            }
        },
    )
    id: int
    question_text: str


class QuestionWithAnswerDto(QuestionDto):
    answer: str


class QuestionCreate(QuestionBase):
    quiz_id: int


class QuestionWithUserAnswerDto(QuestionDto):
    is_correct: bool
    answer_text: str


class QuizBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str
    description_text: str


class QuizDto(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "title": "Тест по Python",
                "description_text": "Тест по Python для начинающих",
                "questions": [
                    {
                        "id": 1,
                        "question_text": "Какой язык программирования самый популярный?",
                        "answer": "Python",
                    },
                ],
            }
        },
    )

    id: int
    title: str
    description_text: str
    questions: list[QuestionDto]


class QuizWithAnswersDto(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "title": "Тест по Python",
                "description_text": "Тест по Python для начинающих",
                "questions": [
                    {
                        "id": 1,
                        "question_text": "Какой язык программирования самый популярный?",
                        "answer": "Python",
                        "is_correct": True,
                    },
                ],
            }
        },
    )

    id: int
    title: str
    description_text: str
    questions: tp.Any = Field(..., default_factory=list)


class QuizCreate(QuizBase):
    questions: list[QuestionBase]


class AnswerBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    question_id: int
    user_id: int
    answer_text: str


class AnswerDto(AnswerBase):
    id: int


class SqlQuiz(Base):
    """
    create table if NOT EXISTS quiz(
    id  SERIAL PRIMARY KEY,
    title TEXT,
    description_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
    );

    """

    __tablename__ = "quiz"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(Text)
    description_text: Mapped[str] = mapped_column(Text)
    created_at: Mapped[dt.datetime] = mapped_column(
        TIMESTAMP, default=dt.datetime.utcnow(), server_default="now()"
    )

    questions: Mapped[list["SqlQuestion"]] = relationship("SqlQuestion")
    # quiz_results: Mapped[list["SqlUserQuiz"]] = relationship(
    #     "SqlUserQuiz", backref="quiz"
    # )


class SqlQuestion(Base):

    """
    create table if not exists question(
        id  SERIAL PRIMARY KEY,
        quiz_id INTEGER ,
        FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE,
        question_text TEXT,
        answer TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );
    """

    __tablename__ = "question"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    quiz_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz.id", ondelete="CASCADE")
    )
    question_text: Mapped[str] = mapped_column(Text)
    answer: Mapped[str] = mapped_column(Text)
    created_at: Mapped[dt.datetime] = mapped_column(
        TIMESTAMP, default=dt.datetime.utcnow(), server_default="now()"
    )

    quiz: Mapped["SqlQuiz"] = relationship("SqlQuiz")

    def __repr__(self) -> str:
        return "<Question(id='{}', quiz_id='{}', question_text='{}', answer='{}', created_at='{}')>".format(
            self.id, self.quiz_id, self.question_text, self.answer, self.created_at
        )   


class SqlAnswer(Base):

    """create table if not exists answer(
        id  SERIAL PRIMARY KEY,
        question_id INTEGER,
        FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        answer_text TEXT,
        is_correct BOOLEAN,
        created_at TIMESTAMP DEFAULT NOW()
    );
    """

    __tablename__ = "answer"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    question_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("question.id", ondelete="CASCADE")
    )
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE")
    )
    answer_text: Mapped[str] = mapped_column(Text)
    is_correct: Mapped[bool] = mapped_column(Boolean)
    created_at: Mapped[dt.datetime] = mapped_column(
        TIMESTAMP, default=dt.datetime.utcnow(), server_default="now()"
    )

    question: Mapped["SqlQuestion"] = relationship("SqlQuestion", backref="answers")


class SqlUserQuiz(Base):
    """
        create table if not exists user_quiz(
        id  SERIAL PRIMARY KEY,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER,
        FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE,
        score INTEGER,
        created_at TIMESTAMP DEFAULT NOW()

    );
    """

    __tablename__ = "user_quiz"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id", ondelete="CASCADE")
    )
    quiz_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("quiz.id", ondelete="CASCADE")
    )
    score: Mapped[int] = mapped_column(Integer)
    created_at: Mapped[dt.datetime] = mapped_column(
        TIMESTAMP, default=dt.datetime.utcnow(), server_default="now()"
    )

    # quiz: Mapped[list["SqlQuiz"]] = relationship("SqlQuiz", backref="quiz_results")
    # user: Mapped[list["SqlUser"]] = relationship("SqlUser", backref="quiz_results")
