"""
post создать skill

"""


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user

from app.auth.jwt import UserTokenData
from app.controllers.course_controller import CourseController
from app.core.sql import Sql
from app.models.course import CourseDto, CourseCreate


router = APIRouter(prefix="/course", tags=["course", "skill"])


@router.post("/")
async def create_course(
    payload: CourseCreate,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> CourseDto:
    # FIXME: ограничить права доступа для пользователей, которым не назначен курс
    try:
        return await CourseController(db).create_course(payload)
    except:
        raise Exception("Course already exists")


@router.get("/{course_id}")
async def get_course(
    course_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> CourseDto:
    try:
        return await CourseController(db).get_course(course_id)
    except:
        raise Exception("Course not found")
