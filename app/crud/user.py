from sqlalchemy.orm import Session

from app.models.user import *


async def create_user(db: Session, payload: UserCreate) -> SqlUser:
    """Создание пользователя"""
    db_user = SqlUser(**payload.model_dump())

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def get_user_by_id(db: Session, user_id: int) -> SqlUser:
    """Получение пользователя по id"""
    user = db.query(SqlUser).where(SqlUser.id == user_id).one_or_none()
    if user:
        return user
    else:
        raise Exception("User not found")


async def get_user_by_email(db: Session, email: str) -> SqlUser:
    """Получение пользователя по email"""
    print(email)
    user = db.query(SqlUser).where(SqlUser.email == email).one_or_none()
    if user:

        return user

    else:
        raise Exception("User not found")
