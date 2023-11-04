from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from app.models import Base
from app.config import config


class Sql:
    def __init__(
        self,
        pg_user: str,
        pg_password: str,
        pg_host: str,
        pg_db: str,
        pg_port: int,
    ) -> None:
        self._user = pg_user
        self._password = pg_password
        self._host = pg_host
        self._port = pg_port
        self._db = pg_db
        self._connect()

    def _connect(self) -> None:
        """Connect to the postgresql database"""
        self.engine = create_engine(
            self.get_connection_uri(),
            pool_pre_ping=True,
        )
        Base.metadata.create_all(bind=self.engine)
        self.db_session = sessionmaker(bind=self.engine)

    def get_session(self):
        """Dependency for fastapi"""
        with self.db_session() as db:
            yield db

    def get_connection_uri(self) -> str:
        return f"postgresql://{self._user}:{self._password}@{self._host}:{self._port}/{self._db}"


db = Sql(
    config.postgres_user,
    config.postgres_password,
    config.postgres_host,
    config.postgres_db,
    config.postgres_port,
)
