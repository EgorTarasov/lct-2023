from sqlalchemy import Column, Integer, Text, JSON
from sqlalchemy.orm import relationship, mapped_column, Mapped


from pydantic import BaseModel, Field, ConfigDict

from . import Base


class RoleCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    permissions: dict = Field(..., min_length=1, max_length=50)


class RoleDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., alias="id")
    name: str = Field(..., min_length=2, max_length=50)
    permissions: dict = Field(..., min_length=1, max_length=50)


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    permissions: Mapped[dict] = mapped_column(JSON, nullable=False)

    # user = relationship("User", back_populates="user_role")
