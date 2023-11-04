from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, Table, DateTime
from .base import Base


mentor_mentee = Table(
    "mentor_mentee",
    Base.metadata,
    Column("mentor_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("mentee_id", Integer, ForeignKey("users.id"), primary_key=True),
    # add column with date of creation
    Column("created_at", DateTime, default=datetime.utcnow),
)
