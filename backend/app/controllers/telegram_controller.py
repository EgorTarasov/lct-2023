from datetime import (
    datetime,
    timedelta,
)
from enum import Enum
from typing import (
    Any,
    Callable,
    Coroutine,
    Dict,
    List,
    Optional,
    Sequence,
    Type,
    Union,
)

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    params,
    status,
)
from fastapi.datastructures import (
    Default,
    DefaultPlaceholder,
)
from fastapi.encoders import (
    DictIntStrAny,
    SetIntStr,
)
from fastapi.responses import JSONResponse
from fastapi.routing import (
    APIRoute,
    BaseRoute,
)
from fastapi.utils import generate_unique_id
from starlette.types import ASGIApp

from app.models.telegram import TelegramLoginData
from app.utils import validate


class TelegramController(APIRouter):
    def __init__(
        self,
        bot_token: str,
        on_success: Callable[[TelegramLoginData], Coroutine[Any, Any, Any]] = None,
        auth_data_ttl_hours: int = 1,
    ):

        self.bot_token = bot_token
        self.on_success = on_success
        self.auth_data_ttl_hours = auth_data_ttl_hours

    async def __login_post(self, data: TelegramLoginData):
        return await self.__handle_login(data)

    async def __login_get(self, data: TelegramLoginData = Depends(TelegramLoginData)):
        return await self.__handle_login(data)

    async def __handle_login(self, data: TelegramLoginData):
        if not validate(data, self.bot_token):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid data"
            )

        hour_ago = datetime.utcnow() - timedelta(hours=self.auth_data_ttl_hours)

        if data.auth_date <= hour_ago.timestamp():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Outdated data"
            )

        if callable(self.on_success):
            return await self.on_success(data)
