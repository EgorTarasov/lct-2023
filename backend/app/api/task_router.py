"""
@get получение неназначенных сотрудников
@post назначение сотрудника ментору
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.controllers.tasks_controller import TaskController
from app.core.sql import Sql
from app.auth.jwt import UserTokenData
from app.models.task import TaskDto, TaskCreate
from app.auth.dependency import get_current_user

router = APIRouter(prefix="/task", tags=["task"])


@router.get("/my", response_model=list[TaskDto])
async def get_user_tasks(
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> list[TaskDto]:
    """Список всех задач для пользователя"""
    try:
        return await TaskController(db).get_tasks(user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/for-mentor", response_model=list[TaskDto])
async def get_tasks_for_mentor_all(
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> list[TaskDto]:
    """Получение списка задач ментором для всех подопечных"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await TaskController(db).get_tasks_for_mentor(user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/for-mentor/{mentee_id}", response_model=list[TaskDto])
async def get_tasks_for_mentor_one(
        mentee_id: int,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> list[TaskDto]:
    """Получение списка задач ментором для одного подопечного"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await TaskController(db).get_tasks(mentee_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/", response_model=TaskDto)
async def create_task(
        task_data: TaskCreate,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> TaskDto:
    """Создание задач ментором"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await TaskController(db).create_task(task_data, user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
