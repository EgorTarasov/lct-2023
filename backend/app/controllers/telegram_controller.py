from datetime import (
    datetime,
    timedelta,
)
from uu import Error
from sqlalchemy.orm import Session
from app.models.telegram import TelegramLoginData


from app.models.telegram import TelegramLoginData
from app.utils import check_telegram_response
from app.auth.jwt import UserTokenData
from app import crud
from app.config import config


class TelegramController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def add_account(self, data: TelegramLoginData, user: UserTokenData):
        if not check_telegram_response(data.model_dump(), config.telegram_bot_token):
            raise ValueError("invalid hash")
        await crud.telegram.add_account(self.db, data, user.user_id)
        return True
