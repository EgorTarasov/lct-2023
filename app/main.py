from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api import main
from app.config import config


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup

    yield

    # shutdown


def create_app():
    _app = FastAPI(
        title="Котики МИСИС",
        description="Сервис онбординга сотрудников",
        version="0.0.1",
        lifespan=lifespan,
    )

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(main.router)

    return _app


app = create_app()


@app.get("/")
async def root():
    return {"message": "Hello from Котики МИСИС!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        'app.main:app',
        host=config.server_host,
        port=config.server_port,
        reload=True
    )