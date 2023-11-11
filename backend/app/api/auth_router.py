import logging
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import HTMLResponse
from fastapi import APIRouter, Depends, HTTPException
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.models.user import UserLogin
from app.models.token import Token
from app.controllers.user_controller import UserController
from app.controllers.telegram_controller import TelegramController
from app.core.sql import Sql
from app.config import config
from app.utils import check_telegram_response
from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.models.telegram import TelegramLoginData


router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/", response_class=HTMLResponse)
def index():
    html_content = f"""
<html>
    <head>
            <title>Some HTML in here</title>
    </head>
    <body>
        <script async src="https://telegram.org/js/telegram-widget.js?22" 
            data-telegram-login="{config.telegram_bot_name}" 
            data-size="medium" 
            data-auth-url="/api/auth/telegram" 
            data-request-access="write">
        </script>
    </body>
</html>
    """
    return HTMLResponse(content=html_content, status_code=200)


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(Sql.get_session),
):
    try:
        token = await UserController(db).authenticate_user(
            UserLogin(email=form_data.username, password=form_data.password)
        )
        return token
    except Exception as e:
        # FIXME: обработать 500 ошибку
        logging.error(e)
        raise HTTPException(status_code=400, detail="Incorrect email or password")


@router.post("/add/telegram")
async def add_telegram(
    telegramData: TelegramLoginData,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    controller = TelegramController(db)
    return await controller.add_account(telegramData, user)


@router.get("/telegram")
async def login_telegram(
    id: str,
    hash: str,
    first_name: str | None = None,
    last_name: str | None = None,
    username: str | None = None,
    photo_url: str | None = None,
    auth_date: str | None = None,
):
    # print("login_telegram")
    telegram_data = {
        "id": id,
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
        "photo_url": photo_url,
        "auth_date": auth_date,
        "hash": hash,
    }
    if check_telegram_response(telegram_data, config.telegram_bot_token):
        # Authorize user
        return telegram_data
    else:
        return "Authorization failed"


@router.post("/send-recover-password")
async def send_recover_password(
    email: EmailStr,
    db: Session = Depends(Sql.get_session),
):
    try:
        await UserController(db).send_recover_password(email)
    except Exception as e:
        # FIXME: обработать 500 ошибку
        logging.error(e)
        raise HTTPException(status_code=400, detail="Почта не найдена")


@router.post("/recover-password")
async def recover_password(
    token: str,
    new_password: str,
    db: Session = Depends(Sql.get_session),
):
    try:
        await UserController(db).recover_password(token, new_password)
    except Exception as e:
        # FIXME: обработать 500 ошибку
        logging.error(e)
        raise HTTPException(status_code=400, detail="Почта не найдена")
