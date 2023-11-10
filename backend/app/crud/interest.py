from sqlalchemy.orm import Session

from app.models.interest import SqlInterest
from app.models.user import SqlUser


async def update_user_interests(
    db: Session, user_id: int, interests_ids: list[int]
) -> list[SqlInterest]:
    db_user = db.query(SqlUser).filter(SqlUser.id == user_id).first()
    if db_user is None:
        return []
    db_user.interests = (
        db.query(SqlInterest).filter(SqlInterest.id.in_(tuple(interests_ids))).all()
    )
    db.commit()
    db.refresh(db_user)

    return db_user.interests


async def get_user_interests(
    db: Session,
    user_id: int,
) -> list[SqlInterest]:
    db_user = db.query(SqlUser).filter(SqlUser.id == user_id).first()
    if not db_user:
        raise IndexError
    return db_user.interests


async def get_available_interests(db: Session) -> list[SqlInterest]:
    db_interests = db.query(SqlInterest).all()
    return db_interests
