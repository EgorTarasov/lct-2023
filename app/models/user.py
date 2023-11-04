import typing as tp

from sqlalchemy import ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from . import Base


class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    middle_name: str = Field(None, min_length=2, max_length=50)
    email: EmailStr = Field(..., min_length=5, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)
    gender: str = Field(None, min_length=1, max_length=10)
    role_id: int = Field(..., ge=1)


class UserLogin(BaseModel):
    email: EmailStr = Field(..., min_length=5, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)


class UserDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., alias="id")
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    middle_name: str = Field(None, min_length=2, max_length=50)
    email: EmailStr = Field(..., min_length=5, max_length=50)
    gender: str = Field(None, min_length=1, max_length=10)
    password: str = Field(..., min_length=8)
    role_id: int = Field(..., ge=1)


class SqlUser(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    first_name: Mapped[str] = mapped_column(Text, nullable=False)
    last_name: Mapped[str] = mapped_column(Text, nullable=False)
    middle_name: Mapped[str] = mapped_column(Text, nullable=True)
    email: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    gender: Mapped[str] = mapped_column(Text, nullable=True)
    password: Mapped[str] = mapped_column(Text, nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)

    user_role = relationship("Role")
