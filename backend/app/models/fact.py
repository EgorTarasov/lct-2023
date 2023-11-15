from pydantic import BaseModel, ConfigDict
from sqlalchemy import Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class FactDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    question: str
    answer: str


class SqlUserFact(Base):
    __tablename__ = "user_facts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    question: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    # user = relationship("SqlUser", back_populates="user_facts")
