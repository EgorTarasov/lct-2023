"""
@get получение неназначенных сотрудников
@post назначение сотрудника ментору
"""


import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.sql import Sql
from app.auth.jwt import UserTokenData
from app.models.user import UserDto
from app.controllers.mentor_controller import MentorController
from app.auth.dependency import get_current_user


router = APIRouter(tags=["mentor", "mentee"])


@router.get("/mentee", response_model=list[UserDto])
async def get_mentees(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[UserDto]:
    """Получение списка пользователей без менторов"""
    try:
        return await MentorController(db).get_mentees(user)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/mentor/me", response_model=list[UserDto])
async def get_my_mentee(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[UserDto]:
    """Получение списка подопечных у ментора"""
    try:
        return await MentorController(db).get_assigned_mentees(user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/mentee/{mentee_id}", response_model=list[UserDto])
async def assign_mentor(
    mentee_id: int,
    mentor_id: int,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[UserDto]:
    logging.info(user)
    logging.info(f"Assign mentor {mentor_id} to mentee {mentee_id}")
    """Назначение ментора пользователю"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await MentorController(db).assign_mentee(mentor_id, mentee_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
