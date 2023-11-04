from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import EmailStr


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    server_host: str = "0.0.0.0"
    server_port: int = 8000

    mail_user: EmailStr
    mail_password: str
    mail_host: str
    mail_port: int
    
    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_db: str
    postgres_port: int = 5432
    
    jwt_secret_key: str
    hash_algorithm: str = "HS256"
    access_token_expire_minutes: int
    jwt_expires_in: int = 3600
    password_length: int = 10


config = Config()  # type: ignore
