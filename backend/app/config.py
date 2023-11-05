from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyUrl, EmailStr, Field


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    server_host: str = "0.0.0.0"
    server_port: int = 8000

    mail_user: EmailStr
    mail_password: str
    mail_host: str
    mail_port: int

    jwt_secret_key: str
    hash_algorithm: str = "HS256"
    access_token_expire_minutes: int
    jwt_expires_in: int = 3600
    password_length: int = 10

    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_db: str
    postgres_port: int = 5432

    @property
    def postgres_url(self) -> str:
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    # celery settings
    rabbitmq_default_user: str
    rabbitmq_default_pass: str
    rabbitmq_host: str = "localhost"
    rabbitmq_port: int = 5672

    @property
    def rabbitmq_url(self) -> str:
        return f"amqp://{config.rabbitmq_default_user}:{config.rabbitmq_default_pass}@{config.rabbitmq_host}:{config.rabbitmq_port}"


config = Config()  # type: ignore
