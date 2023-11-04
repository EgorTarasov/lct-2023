import typing as tp
from sqlalchemy import Integer, Text, ForeignKey
import sqlalchemy
from sqlalchemy.orm import Session, Mapped, mapped_column, relationship

from pydantic import BaseModel, Field, ConfigDict
from .base import Base

if tp.TYPE_CHECKING:
    from .user import SqlUser


class InterestUpdate(BaseModel):
    model_config = ConfigDict(json_schema_extra={"example": {"interests_ids": [1]}})
    interests_ids: list[int] = Field(..., default_factory=list)


class InterestDto(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "name": "саморазвитие",
            }
        },
    )
    id: int = Field(..., ge=1)
    name: str = Field(...)


interest_user = sqlalchemy.Table(
    "interest_user",
    Base.metadata,
    sqlalchemy.Column(
        "interest_id", Integer, ForeignKey("interest.id"), primary_key=True
    ),
    sqlalchemy.Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
)


class SqlInterest(Base):
    __tablename__ = "interest"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(Text, unique=True)

    users: Mapped[list["SqlUser"]] = relationship(
        secondary=interest_user, back_populates="interests"
    )
