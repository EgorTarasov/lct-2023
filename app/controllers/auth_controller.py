from sqlalchemy.orm import Session
from app.auth import AuthService, JWTEncoder

from app.repository import AbstractUserRepo
from app.models.user import UserCreate, UserDto, UserLogin
from app.models.token import Token
from app.repository.user import SqlUserRepo


class AuthController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_user(self, payload: UserCreate) -> UserDto | None:
        user_repo = SqlUserRepo(self.db)
        payload.password = AuthService.hash_password(payload.password)
        try:
            await user_repo.create_user(payload)
        except Exception as e:
            raise e

    async def authenticate_user(self, payload: UserLogin) -> Token:
        user_repo = SqlUserRepo(self.db)
        user = await user_repo.get_user(email=payload.email)
        if not user:
            raise Exception("User not found")
        if not AuthService.verify_password(payload.password, user.password):
            raise Exception("Incorrect password")
        return Token(
            access_token=JWTEncoder.create_jwt_token(
                {"email": user.email, "role_id": user.role_id}
            ),
            token_type="bearer",
        )
