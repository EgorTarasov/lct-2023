from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from contextlib import asynccontextmanager
import logging
import hashlib
import hmac

from app.api import main_router
from app.config import config
from app.controllers.user_controller import UserController
from app.core.sql import Sql
from app.models.base import Base
from app import crud
from app.models.position import PositionCreate
from app.models.role import RoleCreate
from app.controllers.course_controller import CourseController
from app.models.course import CourseCreate


async def load_data(sql: Sql):
    # checks if users not exists load admin data from .env and create user
    db = next(sql.get_session())
    try:
        _ = crud.user.get_user_by_email(db, config.admin_email)
    except Exception as e:
        await crud.role.create_role(
            db, RoleCreate(name="user", permissions={"editing": False})
        )

        await crud.role.create_role(
            db, RoleCreate(name="hr", permissions={"editing": True})
        )
        await crud.position.create(db, PositionCreate(name="hr"))
        await crud.event.create_event_types(
            db, ["Спорт", "Образование", "Волонтёрство", "Творчество"]
        )

        await crud.position.create(db, PositionCreate(name="Client Service"))
        await crud.position.create(db, PositionCreate(name="Design"))
        await crud.position.create(db, PositionCreate(name="Engineering"))
        await crud.position.create(db, PositionCreate(name="Project Management"))

        await UserController(db).prepare_test_users()


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
    Base.metadata.create_all(bind=sql.get_engine())

    await load_data(sql)
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

    _app.mount("/api/static", StaticFiles(directory="static"), name="static")
    _app.include_router(main_router.router, prefix="/api")

    return _app


app = create_app()


# @app.get("/api")
# async def root():
#     return {"message": "Hello from Котики МИСИС!"}


@app.get("/api", response_class=HTMLResponse)
def index():
    html_content = f"""
<html>
    <head>
            <title>Some HTML in here</title>
    </head>
    <body>
        <script async src="https://telegram.org/js/telegram-widget.js?22" 
            data-telegram-login="{config.telegram_bot_name}" 
            data-size="medium" 
            data-auth-url="{config.domain}/api/login/telegram" 
            data-request-access="write">
        </script>
    </body>
</html>

    """
    return HTMLResponse(content=html_content, status_code=200)


def check_response(data):
    print("check_response")
    d = data.copy()
    del d["hash"]
    d_list = []
    for key in sorted(d.keys()):
        if d[key] is not None:
            d_list.append(key + "=" + d[key])
    data_string = bytes("\n".join(d_list), "utf-8")

    secret_key = hashlib.sha256(config.telegram_bot_token.encode("utf-8")).digest()
    hmac_string = hmac.new(secret_key, data_string, hashlib.sha256).hexdigest()
    if hmac_string == data["hash"]:
        return True
    return False


@app.get("api/login/telegram")  # get для тестов
def login_telegram(
    id: str,
    hash: str,
    first_name: str | None = None,
    last_name: str | None = None,
    username: str | None = None,
    photo_url: str | None = None,
    auth_date: str | None = None,
):
    print("login_telegram")
    telegram_data = {
        "id": id,
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
        "photo_url": photo_url,
        "auth_date": auth_date,
        "hash": hash,
    }
    if check_response(telegram_data):
        # Authorize user
        return telegram_data
    else:
        return "Authorization failed"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app", host=config.server_host, port=config.server_port, reload=True
    )
