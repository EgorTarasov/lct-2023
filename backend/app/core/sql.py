from sqlalchemy import create_engine
import sqlalchemy
from sqlalchemy.orm import sessionmaker
from app.models.base import Base


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

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "instance"):
            cls.instance = super(Sql, cls).__new__(cls)
        return cls.instance

    def _connect(self) -> None:
        """Connect to the postgresql database"""
        self.engine = create_engine(
            self.get_connection_uri(),
            pool_pre_ping=True,
        )
        self.db_session = sessionmaker(bind=self.engine)

    def get_engine(self):
        return self.engine

    @classmethod
    def get_session(cls):
        """Dependency for fastapi"""
        with cls.instance.db_session() as db:
            yield db

    def get_connection_uri(self) -> str:
        print(f"postgresql://{self._user}:{self._password}@{self._host}:{self._port}/{self._db}")
        return f"postgresql://{self._user}:{self._password}@{self._host}:{self._port}/{self._db}"
