from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Body, Depends, HTTPException

from app.models.user import UserLogin, UserCreate
from app.models.token import Token
from app.services.auth import Service, get_auth_service
from app.repository import AbstractUserRepo, get_user_repo

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: Service = Depends(get_auth_service),
    user_repo: AbstractUserRepo = Depends(get_user_repo),
):
    try:
        return await auth_service.authenticate_user(
            user_repo, UserLogin(email=form_data.username, password=form_data.password)
        )

    except Exception as e:
        # FIXME: обработать 500 ошибку
        print(e)
        raise HTTPException(status_code=400, detail="Incorrect email or password")


@router.post("/register")
async def register(
    user_data: UserCreate,
    auth_service: Service = Depends(get_auth_service),
    user_repo: AbstractUserRepo = Depends(get_user_repo),
):
    user = await auth_service.create_user(user_repo, user_data)
    if not user:
        raise HTTPException(status_code=400, detail="User already exists")
    return user


#     pass
#     # user = await auth_service.authenticate_user(UserBase(email=form_data.username, password=form_data.password))
#     # if not user:
#     #     raise HTTPException(
#     #         status_code=status.HTTP_401_UNAUTHORIZED,
#     #         detail="Incorrect email or password",
#     #         headers={"WWW-Authenticate": "Bearer"},
#     #     )
#     # access_token_expires = timedelta(minutes=config.access_token_expire_minutes)
#     # access_token = create_access_token(
#     #     data={"sub": user.email}, expires_delta=access_token_expires
#     # )
#     # return {"access_token": access_token, "token_type": "bearer"}

# {
#   "first_name": "Egor",
#   "last_name": "Tarasov",
#   "middle_name": "Vasilievich",
#   "email": "user@example.com",
#   "password": "Test123456",
#   "gender": "male",
#   "role_id": 1
# }
