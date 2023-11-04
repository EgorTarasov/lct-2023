from .user import *
from .role import *

from app.core.sql import db

from fastapi import Depends


def get_user_repo(db: Session = Depends(db.get_session)) -> SqlUserRepo:
    return SqlUserRepo(db)


def get_role_repo(db: Session = Depends(db.get_session)) -> SqlRoleRepo:
    return SqlRoleRepo(db)
