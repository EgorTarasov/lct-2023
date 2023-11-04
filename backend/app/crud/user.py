from sqlalchemy.orm import Session

from app.models.user import *
from app.models.mentee import mentor_mentee


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
    user = db.query(SqlUser).where(SqlUser.email == email).one_or_none()
    if user:
        return user
    else:
        raise Exception("User not found")


async def get_mentee(db: Session) -> list[UserDto]:
    # получить сприсок пользователей без менторов
    # select users which are not in mentor_mentee table as mentees
    result = (
        db.query(SqlUser)
        .filter(~SqlUser.id.in_(db.query(mentor_mentee.c.mentee_id)))
        .filter(SqlUser.role_id == 1)
        .all()
    )
    return [UserDto.model_validate(obj) for obj in result]


async def get_assigned_mentees(db: Session, mentor_id: int):
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

    return [UserDto.model_validate(obj) for obj in mentees]


async def assign_mentee(db: Session, mentor_id: int, mentee_id: int) -> list[UserDto]:
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

    return [UserDto.model_validate(obj) for obj in mentees]
