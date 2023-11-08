from sqlalchemy.orm import Session

from app.auth import PasswordManager
from app.models.user import *
from app.models.mentee import mentor_mentee


def create_user(db: Session, payload: UserCreate, password: str) -> SqlUser:
    """Создание пользователя"""
    hashed_password = PasswordManager.hash_password(password)
    db_user = SqlUser(**payload.model_dump(), password=hashed_password)

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


def get_user_by_fio(db: Session, fio: str) -> SqlUser:
    last_name, first_name, middle_name = fio.split()

    # Выполните запрос
    result = (
        db.query(SqlUser)
        .filter_by(first_name=first_name, last_name=last_name, middle_name=middle_name)
        .first()
    )
    if result:
        return result
    else:
        raise Exception("User not found")


def get_user_by_email(db: Session, email: str) -> SqlUser:
    """Получение пользователя по email"""
    user = db.query(SqlUser).where(SqlUser.email == email).one_or_none()
    if user:
        return user
    else:
        raise Exception("User not found")


async def get_mentee(db: Session) -> list[SqlUser]:
    # получить список пользователей без менторов
    # select users which are not in mentor_mentee table as mentees
    result = (
        db.query(SqlUser)
        .filter(~SqlUser.id.in_(db.query(mentor_mentee.c.mentee_id)))
        .filter(SqlUser.role_id == 1)
        .all()
    )
    return result


async def get_assigned_mentees(db: Session, mentor_id: int) -> list[SqlUser]:
    """
    SELECT
            users.id,
        users.first_name,
        users.last_name,
        users.email

        FROM mentor_mentee
        JOIN users on mentor_mentee.mentee_id = users.id
        WHERE mentor_id = :mentor_id;
    """
    mentees: list[SqlUser] = (
        db.query(SqlUser)
        .join(mentor_mentee, mentor_mentee.c.mentee_id == SqlUser.id)
        .filter(mentor_mentee.c.mentor_id == mentor_id)
        .all()
    )

    return mentees


async def assign_mentee(db: Session, mentor_id: int, mentee_id: int) -> list[SqlUser]:
    mentor = db.query(SqlUser).where(SqlUser.id == mentor_id).one_or_none()
    if not mentor:
        raise Exception("Mentor not found")
    mentee = db.query(SqlUser).where(SqlUser.id == mentee_id).one_or_none()
    if not mentee:
        raise Exception("Mentee not found")
    record = mentor_mentee.insert().values(mentor_id=mentor_id, mentee_id=mentee_id)
    db.execute(record)
    db.commit()
    mentees: list[SqlUser] = (
        db.query(SqlUser)
        .join(mentor_mentee, mentor_mentee.c.mentee_id == SqlUser.id)
        .filter(mentor_mentee.c.mentor_id == mentor_id)
        .all()
    )

    return mentees
