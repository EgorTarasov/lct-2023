from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.analytic_controller import AnalyticController
from app.core.sql import Sql
from app.models.action import ActionDto

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/actions/{user_id}", response_model=list[ActionDto])
async def get_actions_from_user(
    user_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[ActionDto]:
    return await AnalyticController(db).get_actions_by_user_id(user_id)


@router.get("/actions/", response_model=list[ActionDto])
async def get_all_actions(
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[ActionDto]:
    return await AnalyticController(db).get_actions()
