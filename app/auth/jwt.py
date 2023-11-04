import datetime as dt
from jose import jwt
from app.config import config

# from fastapi.security import OAuth2PasswordBearer


class JWTEncoder:
    @staticmethod
    def create_jwt_token(
        data: dict[str, str | dt.datetime | int], expires_delta: dt.timedelta | None = None
    ):
        """
        data: {
            email: str
            role
        }
        """
        to_encode = data.copy()
        if expires_delta:
            expire = dt.datetime.utcnow() + expires_delta
        else:
            expire = dt.datetime.utcnow()
        to_encode["exp"] = expire
        return jwt.encode(
            to_encode, config.jwt_secret_key, algorithm=config.hash_algorithm
        )

    @staticmethod
    def decode_jwt(token: str) -> dict[str, str | dt.datetime]:
        return jwt.decode(token, config.jwt_secret_key, config.hash_algorithm)
