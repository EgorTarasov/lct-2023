import datetime as dt
from typing import NamedTuple
from jose import jwt

from app.config import config


class UserTokenData(NamedTuple):
    """Данные которые хранятся в jwt токене пользователя
    user_id: int
    email: str
    role_id: int
    exp: dt.datetime
    """

    user_id: int
    email: str
    role_id: int
    exp: dt.datetime


# UserTokenData = namedtuple("UserTokenData", ["user_id", "email", "role_id", "exp"])


class JWTEncoder:
    @staticmethod
    def create_jwt_token(
            data: dict[str, str | dt.datetime | int],
            expires_delta: dt.timedelta = dt.timedelta(minutes=config.jwt_expires_in),
    ):
        to_encode = data.copy()
        to_encode["exp"] = dt.datetime.utcnow() + expires_delta
        return jwt.encode(
            to_encode, config.jwt_secret_key, algorithm=config.hash_algorithm
        )

    @staticmethod
    def decode_jwt(token: str) -> dict[str, str | dt.datetime]:
        return jwt.decode(token, config.jwt_secret_key, config.hash_algorithm)

    @staticmethod
    def create_access_token(
            user_id: int,
            email: str,
            role_id: int,
            expires_delta: dt.timedelta = dt.timedelta(
                minutes=config.access_token_expire_minutes
            ),
    ) -> str:
        to_encode = {"user_id": user_id, "email": email, "role_id": role_id,
                     "exp": dt.datetime.utcnow() + expires_delta}
        return jwt.encode(
            to_encode, config.jwt_secret_key, algorithm=config.hash_algorithm
        )

    @staticmethod
    def decode_access_token(token: str) -> UserTokenData:
        return UserTokenData(
            **jwt.decode(token, config.jwt_secret_key, config.hash_algorithm)
        )
