from pydantic import BaseModel, ConfigDict
from sqlalchemy import Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class UserFactCreate(BaseModel):
    question: str
    answer: str


class UserFactDto(UserFactCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class SqlUserFact(Base):
    __tablename__ = "user_facts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    question: Mapped[str] = mapped_column(Text, nullable=True)
    answer: Mapped[str] = mapped_column(Text, nullable=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    # user = relationship("SqlUser")
