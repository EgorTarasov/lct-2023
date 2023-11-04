from sqlalchemy.orm import Session

from app.models.interest import SqlInterest, interest_user, InterestDto
from app.models.user import SqlUser


async def update_user_interests(
    db: Session, user_id: int, interests_ids: list[int]
) -> list[InterestDto]:
    db_user = db.query(SqlUser).filter(SqlUser.id == user_id).first()
    if db_user is None:
        return []
    db_user.interests = (
        db.query(SqlInterest).filter(SqlInterest.id.in_(tuple(interests_ids))).all()
    )
    db.commit()
    db.refresh(db_user)

    return [InterestDto.model_validate(obj) for obj in db_user.interests]


async def get_user_interests(
    db: Session,
    user_id: int,
) -> list[InterestDto]:
    db_user = db.query(SqlUser).filter(SqlUser.id == user_id).first()
    if db_user:
        return [InterestDto.model_validate(obj) for obj in db_user.interests]
    raise IndexError


async def get_avaliable_interests(db: Session) -> list[InterestDto]:
    db_interests = db.query(SqlInterest).all()
    return [InterestDto.model_validate(obj) for obj in db_interests]
