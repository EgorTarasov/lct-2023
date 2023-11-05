"""
@post добавление данных из телеграмма
@post добавление увлечений сотрудника
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user

from app.auth.jwt import UserTokenData
from app.models.interest import InterestUpdate, InterestDto
from app.controllers.interest_controller import InterestController
from app.core.sql import Sql

router = APIRouter(prefix="/user", tags=["user"])


@router.post("/interest", response_model=list[InterestDto], tags=["interest"])
async def update_interests(
    payload: InterestUpdate,
    db: Session = Depends(Sql.get_session),
    user: UserTokenData = Depends(get_current_user),
) -> list[InterestDto]:
    try:
        return await InterestController(db).update_interest(user, payload)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/interest", response_model=list[InterestDto], tags=["interest"])
async def get_users_interests(
    db: Session = Depends(Sql.get_session),
    user: UserTokenData = Depends(get_current_user),
) -> list[InterestDto]:
    try:
        return await InterestController(db).get_users_interests(user)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
