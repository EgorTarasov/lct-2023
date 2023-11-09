import datetime
import typing as tp

from sqlalchemy import ForeignKey, Integer, Text, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from .base import Base
from .interest import interest_user
from .mentee import mentor_mentee
from .position import PositionDto
from .role import RoleDto

if tp.TYPE_CHECKING:
    from .interest import SqlInterest
    from .event import SqlEvent


class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    middle_name: str = Field(None, min_length=2, max_length=50)
    email: EmailStr = Field(..., min_length=5, max_length=50)
    number: str = Field(...)
    adaptation_target: str = Field(...)
    starts_work_at: datetime.date = Field(...)
    position_id: int = Field(..., ge=1)
    role_id: int = Field(default=1, ge=1)


class UserLogin(BaseModel):
    email: EmailStr = Field(..., min_length=5, max_length=50)
    password: str = Field(..., min_length=6, max_length=50)


class UserDto(UserCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int = Field(..., alias="id")
    user_role: RoleDto
    position: PositionDto


class SqlUser(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    first_name: Mapped[str] = mapped_column(Text, nullable=False)
    last_name: Mapped[str] = mapped_column(Text, nullable=False)
    middle_name: Mapped[str] = mapped_column(Text, nullable=True)
    email: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    gender: Mapped[str] = mapped_column(Text, nullable=True)
    password: Mapped[str] = mapped_column(Text, nullable=False)
    number: Mapped[str] = mapped_column(Text, nullable=False)
    adaptation_target: Mapped[str] = mapped_column(Text, nullable=False)
    starts_work_at: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    role_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("roles.id", ondelete="NO ACTION"),
        nullable=False,
    )
    position_id: Mapped[int] = mapped_column(
        ForeignKey("positions.id", ondelete=None), nullable=True, default=None,
    )

    user_role = relationship("SqlRole")
    position = relationship("SqlPosition", back_populates="users")
    interests: Mapped[list["SqlInterest"]] = relationship(
        secondary=interest_user, back_populates="users"
    )
    events: Mapped[list["SqlEvent"]] = relationship(
        secondary="enrollments",
    )

    mentors: Mapped[list["SqlUser"]] = relationship(
        secondary=mentor_mentee,
        foreign_keys=[mentor_mentee.c.mentor_id],
        back_populates="mentees",
    )
    mentees: Mapped[list["SqlUser"]] = relationship(
        secondary=mentor_mentee,
        foreign_keys=[mentor_mentee.c.mentee_id],
        back_populates="mentors",
    )
