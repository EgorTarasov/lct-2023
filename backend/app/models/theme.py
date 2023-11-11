from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session, Mapped, mapped_column
from sqlalchemy import Text, Integer
from .base import Base


class ThemeBase(BaseModel):

    company_name: str
    company_logo: str
    main_color: str


class ThemeDto(ThemeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class SqlTheme(Base):
    __tablename__ = "theme"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company_name: Mapped[str] = mapped_column(Text)
    company_logo: Mapped[str] = mapped_column(Text)
    main_color: Mapped[str] = mapped_column(Text)
