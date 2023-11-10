"""
@get получение неназначенных сотрудников
@post назначение сотрудника ментору
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.controllers.admin_controller import AdminController
from app.controllers.tasks_controller import TaskController
from app.core.sql import Sql
from app.auth.jwt import UserTokenData
from app.models.task import TaskDto, TaskCreate, TaskStatus
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
        payload: TaskCreate,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> TaskDto:
    """Создание задач ментором"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await TaskController(db).create_task(payload, user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.put("/{task_id}", response_model=TaskDto)
async def change_task(
        task_id: int,
        payload: TaskCreate,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> TaskDto:
    """Изменение задач ментором"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        return await TaskController(db).change_task(task_id, payload)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.delete("/{task_id}")
async def delete_task(
        task_id: int,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
):
    """Удаление задач ментором"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    try:
        await TaskController(db).delete_task(task_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.put("/update_status/{task_id}", response_model=TaskDto)
async def change_task(
        task_id: int,
        task_status: TaskStatus,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> TaskDto:
    """Выполнение задачи пользователем или отмена выполнения"""
    try:

        return await TaskController(db).change_task_status(task_id, task_status)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
