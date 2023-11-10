"""
post создать skill

"""


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user

from app.auth.jwt import UserTokenData
from app.controllers.course_controller import CourseController
from app.core.sql import Sql
from app.models.course import CourseDto, CourseCreate


router = APIRouter(prefix="/course", tags=["course"])


@router.post("/")
async def create_course(
    payload: CourseCreate,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> CourseDto:
    # FIXME: ограничить права доступа для пользователей, которым не назначен курс
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )
    try:
        return await CourseController(db).create_course(payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Такой курс уже существует"
        )


@router.get("/my")
async def get_my_courses(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[CourseDto]:
    try:
        return await CourseController(db).get_courses(user.user_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Такой курс уже существует"
        )


@router.get("/{course_id}")
async def get_course(
    course_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> CourseDto:
    try:
        return await CourseController(db).get_course(course_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Курс не найден"
        )


@router.get("/for-position/{position_id}", response_model=list[CourseDto])
async def get_courses_by_position(
    position_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[CourseDto]:
    try:
        return await CourseController(db).get_courses_by_position(position_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Позиция не найдена"
        )
