from sys import prefix
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.api import main
from app.config import config
from app.core.sql import Sql


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup
    Sql(
        pg_user=config.postgres_user,
        pg_password=config.postgres_password,
        pg_host=config.postgres_host,
        pg_db=config.postgres_db,
        pg_port=config.postgres_port,
    )
    yield

    # shutdown


def create_app():
    # setup logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    )

    _app = FastAPI(
        title="Котики МИСИС",
        description="Сервис онбординга сотрудников",
        version="0.0.1",
        lifespan=lifespan,
        docs_url="/api/docs",
    )

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(main.router, prefix="/api")

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
