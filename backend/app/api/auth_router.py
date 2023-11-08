import logging
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.user import UserLogin, UserCreate
from app.models.token import Token
from app.controllers.user_controller import UserController
from app.core.sql import Sql


router = APIRouter(prefix="/auth", tags=["auth"])


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


