from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000

    # postgres_user: str
    # postgres_password: str
    # postgres_server: str
    # postgres_db: str
    #
    # jwt_secret_key: str
    # hash_algorithm: str = 'hs256'
    # access_token_expire_minutes: int
    # jwt_expires_in: int = 3600
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


config = Config()
