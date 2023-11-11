from sqlalchemy.orm import Session

from app.models.recover_password_token import SqlRecoverPasswordToken


def create(db: Session, token: str, user_id: int):
    """Создание мероприятия"""
    db_token = SqlRecoverPasswordToken(token=token, user_id=user_id)

    db.add(db_token)
    db.commit()
    db.refresh(db_token)
    return db_token


def get_by_user_id(db: Session, user_id: int) -> SqlRecoverPasswordToken | None:
    """Получение всех мероприятий"""
    db_token = db.query(SqlRecoverPasswordToken).where(SqlRecoverPasswordToken.user_id == user_id).one_or_none()
    return db_token


def get_by_token(db: Session, token: str) -> SqlRecoverPasswordToken | None:
    """Получение всех мероприятий"""
    db_token = db.query(SqlRecoverPasswordToken).where(SqlRecoverPasswordToken.token == token).one_or_none()
    return db_token



def delete(db: Session, token: str):
    """Получение всех мероприятий"""
    deleted_rows = db.query(SqlRecoverPasswordToken).where(SqlRecoverPasswordToken.token == token).delete()
    db.commit()
