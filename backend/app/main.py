from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import datetime

from app.api import main_router
from app.config import config
from app.core.sql import Sql
from app.models.base import Base
from app import crud
from app.models.position import PositionCreate
from app.models.role import RoleCreate
from app.models.user import UserCreate
from app.worker import celery



@asynccontextmanager
async def lifespan(app: FastAPI):
    global celery
    # startup
    sql = Sql(
        pg_user=config.postgres_user,
        pg_password=config.postgres_password,
        pg_host=config.postgres_host,
        pg_db=config.postgres_db,
        pg_port=config.postgres_port,
    )
    # from datetime import datetime, timedelta
    # tomorrow = datetime.utcnow() + timedelta(seconds=15)
    # hello.apply_async(eta=tomorrow)
    Base.metadata.create_all(bind=sql.get_engine())

    # checks if users not exists load admin data from .env and create user
    db = next(sql.get_session())
    try:
        _ = await crud.user.get_user_by_id(db, 1)
    except Exception as e:
        role = await crud.role.create_role(
            db, RoleCreate(name="user", permissions={"editing": False})
        )

        role = await crud.role.create_role(
            db, RoleCreate(name="hr", permissions={"editing": True})
        )
        position = await crud.position.create(db, PositionCreate(name="hr"))
        user = crud.user.create_user(
            db,
            UserCreate(
                first_name="Иван",
                last_name="Иванов",
                middle_name="Иванович",
                email=config.admin_email,
                adaptation_target="",
                starts_work_at=datetime.date.today(),
                role_id=role.id,
                position_id=position.id,
                number="88005553535",
            ),
            config.admin_password,
        )
    yield

    # shutdown


def create_app():
    # setup logging
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    )

    _app = FastAPI(
        title="Котики МИСИС",
        description="Сервис онбординга сотрудников",
        version="0.0.1",
        lifespan=lifespan,
        openapi_url="/api/openapi.json",
        docs_url="/api/docs",
    )

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(main_router.router, prefix="/api")

    return _app


app = create_app()


@app.get("/api")
async def root():
    return {"message": "Hello from Котики МИСИС!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app", host=config.server_host, port=config.server_port, reload=True
    )
