from datetime import timedelta

from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.schemas.token import Token
from app.schemas.user import UserDto

# from app.schemas.users import UserBase, User
# from app.services.auth import AuthService, get_auth_service
# from app.services.users import UserService, get_user_service
# from app.core.security import create_access_token
# from app.schemas.tokens import Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
        form_data: OAuth2PasswordRequestForm = Depends(),
        # auth_service: AuthService = Depends(get_auth_service)
):
    pass
    # user = await auth_service.authenticate_user(UserBase(email=form_data.username, password=form_data.password))
    # if not user:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Incorrect email or password",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    # access_token_expires = timedelta(minutes=config.access_token_expire_minutes)
    # access_token = create_access_token(
    #     data={"sub": user.email}, expires_delta=access_token_expires
    # )
    # return {"access_token": access_token, "token_type": "bearer"}
