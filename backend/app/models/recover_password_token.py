from sqlalchemy import Integer, Text, JSON, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

from .base import Base


class SqlRecoverPasswordToken(Base):
    __tablename__ = "recover_password_token"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    token: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    user = relationship("SqlUser")
