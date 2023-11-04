from sqlalchemy.orm import Session
from app.auth import PasswordManager, JWTEncoder


from app.models.user import UserCreate, UserDto, UserLogin
from app.models.token import Token
from app import crud


class AuthController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_user(self, payload: UserCreate) -> UserDto | None:

        payload.password = PasswordManager.hash_password(payload.password)
        try:
            await crud.user.create_user(self.db, payload)
        except Exception as e:
            raise e

    async def authenticate_user(self, payload: UserLogin) -> Token:
        user = await crud.user.get_user_by_email(self.db, payload.email)
        if not user:
            raise Exception("User not found")
        if not PasswordManager.verify_password(payload.password, user.password):
            raise Exception("Incorrect password")
        return Token(
            access_token=JWTEncoder.create_access_token(
                user.id, user.email, user.role_id
            ),
            token_type="bearer",
        )
