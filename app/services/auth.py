from app.auth import AuthController, JWTEncoder

from app.repository import AbstractUserRepo
from app.models.user import UserCreate, UserDto, UserLogin
from app.models.token import Token


class Service:
    async def create_user(
        self, user_repo: AbstractUserRepo, payload: UserCreate
    ) -> UserDto | None:
        payload.password = AuthController.hash_password(payload.password)

        try:
            await user_repo.create_user(payload)
        except Exception as e:
            raise e

    async def authenticate_user(
        self, user_repo: AbstractUserRepo, payload: UserLogin
    ) -> Token:
        user = await user_repo.get_user(email=payload.email)
        if not user:
            raise Exception("User not found")
        if not AuthController.verify_password(payload.password, user.password):
            raise Exception("Incorrect password")
        return Token(
            access_token=JWTEncoder.create_jwt_token(
                {"email": user.email, "role_id": user.role_id}
            ),
            token_type="bearer",
        )


def get_auth_service() -> Service:
    return Service()
