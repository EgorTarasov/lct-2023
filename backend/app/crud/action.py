from sqlalchemy.orm import Session

from ..models.action import SqlAction, ActionCreate


async def create(db: Session, payload: ActionCreate):
    db_action = SqlAction(**payload.model_dump())

    db.add(db_action)
    db.commit()


async def get_actions_by_user_id(db: Session, user_id: int) -> list[SqlAction]:
    db_actions = db.query(SqlAction).filter(SqlAction.user_id == user_id).order_by(SqlAction.created_at).all()
    return db_actions


async def get_all(db: Session) -> list[SqlAction]:
    db_actions = db.query(SqlAction).order_by(SqlAction.user_id, SqlAction.created_at).all()
    return db_actions