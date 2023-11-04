from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext


class AuthService:
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return cls.pwd_context.hash(password)
