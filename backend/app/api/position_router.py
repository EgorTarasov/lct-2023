import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.auth.security import PasswordManager

from app.models.position import PositionCreate, PositionDto
from app.core.sql import Sql

from app.controllers.position_controller import PositionController


router = APIRouter(prefix="/position", tags=["user"])


@router.post("/", response_model=PositionDto, status_code=status.HTTP_201_CREATED)
async def create_position(
    role_data: PositionCreate,
    user_data: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> PositionDto:

    if not role:
        raise HTTPException(status_code=400, detail="Role already exists")
    return role


@router.get("/", response_model=list[RoleDto], status_code=status.HTTP_200_OK)
async def get_roles(
    db: Session = Depends(Sql.get_session),
):
    try:
        roles = await RoleController(db).get_avaliable_roles()
        return roles
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
