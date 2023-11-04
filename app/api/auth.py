from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.user import UserLogin, UserCreate
from app.models.token import Token
from app.controllers.auth_controller import AuthController
from app.core.sql import Sql


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(Sql.get_session),
):
    try:
        token = await AuthController(db).authenticate_user(
            UserLogin(email=form_data.username, password=form_data.password)
        )
        return token
    except Exception as e:
        # FIXME: обработать 500 ошибку
        print(e)
        raise HTTPException(status_code=400, detail="Incorrect email or password")


@router.post("/register")
async def register(
    user_data: UserCreate,
    db: Session = Depends(Sql.get_session),
):
    user = await AuthController(db).create_user(user_data)
    if not user:
        raise HTTPException(status_code=400, detail="User already exists")
    return user
