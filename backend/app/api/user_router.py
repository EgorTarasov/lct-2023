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
from app.models.position import PositionCreate, PositionDto
from app.models.role import RoleCreate, RoleDto
from app.controllers.user_controller import UserController


from app.core.sql import Sql

router = APIRouter(prefix="/user", tags=["user"])


interest_router = APIRouter(prefix="/interest")
position_router = APIRouter(prefix="/position")
role_router = APIRouter(prefix="/role")


@interest_router.get("/", response_model=list[InterestDto])
async def get_available_interests(
    db: Session = Depends(Sql.get_session),
):
    """Интересы / хобби доступные для выбора


    Raises:
        HTTPException: не повезло, надо было на го писать
    """
    try:
        return await UserController(db).get_avaliable_interest()
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@interest_router.post("/", response_model=list[InterestDto])
async def update_interests(
    payload: InterestUpdate,
    db: Session = Depends(Sql.get_session),
    user: UserTokenData = Depends(get_current_user),
) -> list[InterestDto]:
    try:
        return await UserController(db).update_interest(user, payload)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@interest_router.get("/my", response_model=list[InterestDto])
async def get_users_interests(
    db: Session = Depends(Sql.get_session),
    user: UserTokenData = Depends(get_current_user),
) -> list[InterestDto]:
    try:
        return await UserController(db).get_users_interests(user)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@position_router.post(
    "/", response_model=PositionDto, status_code=status.HTTP_201_CREATED
)
async def create_position(
    payload: PositionCreate,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> PositionDto:
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )
    try:
        return await UserController(db).create_position(payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Такая позиция уже существует"
        )


@position_router.get(
    "/", response_model=list[PositionDto], status_code=status.HTTP_200_OK
)
async def get_positions(
    db: Session = Depends(Sql.get_session),
) -> list[PositionDto]:
    positions = await UserController(db).get_positions()
    return positions


@role_router.post("/", response_model=RoleDto, status_code=status.HTTP_201_CREATED)
async def create_role(
    payload: RoleCreate,
    user_data: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    logging.info(user_data)
    role = await UserController(db).create_role(payload)
    if not role:
        raise HTTPException(status_code=400, detail="Role already exists")
    return role


@role_router.get("/", response_model=list[RoleDto], status_code=status.HTTP_200_OK)
async def get_roles(
    db: Session = Depends(Sql.get_session),
):
    try:
        roles = await UserController(db).get_avaliable_roles()
        return roles
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


router.include_router(role_router)
router.include_router(interest_router)
router.include_router(position_router)
