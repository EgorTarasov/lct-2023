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
from app.models.tasks import TaskDto
from app.models.user import UserDto
from app.controllers.mentor_controller import MentorController
from app.auth.dependency import get_current_user


router = APIRouter(tags=["task"])


@router.get("/mentee", response_model=list[TaskDto])
async def get_tasks(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[TaskDto]:
    """Получение списка задач для пользователя"""
    try:
        return await TaskController(db).get_tasks(user.user_id)
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


