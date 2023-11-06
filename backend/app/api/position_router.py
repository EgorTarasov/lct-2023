
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.position_controller import PositionController

from app.models.position import PositionCreate, PositionDto
from app.core.sql import Sql


router = APIRouter(prefix="/position", tags=["position"])


@router.post("/", response_model=PositionDto, status_code=status.HTTP_201_CREATED)
async def create_position(
    payload: PositionCreate,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> PositionDto:
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")
    try:
        return await PositionController(db).create(payload)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Такая позиция уже существует")


@router.get("/", response_model=list[PositionDto], status_code=status.HTTP_200_OK)
async def get_positions(
    db: Session = Depends(Sql.get_session),
) -> list[PositionDto]:
    positions = await PositionController(db).get_positions()
    return positions
