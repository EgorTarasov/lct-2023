from sqlalchemy.orm import Session
from app.models.telegram import SqlTelegram, TelegramLoginData


async def add_account(
    db: Session, payload: TelegramLoginData, user_id: int
) -> SqlTelegram:
    db_telegram = SqlTelegram(
        id=payload.id,
        user_id=user_id,
        first_name=payload.first_name,
        last_name=payload.last_name,
        username=payload.username,
        photo_url=payload.photo_url,
        auth_date=payload.auth_date,
    )
    db.add(db_telegram)
    db.commit()
    db.refresh(db_telegram)
    return db_telegram
