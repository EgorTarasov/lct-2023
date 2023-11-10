"""
post создать skill

"""


from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.course_controller import CourseController
from app.core.sql import Sql
from app.models.course import CourseDto, CourseCreate


router = APIRouter(prefix="/course", tags=["course"])


@router.post("/")
async def create_course(
    payload: CourseCreate = Depends(),
    user: UserTokenData = Depends(get_current_user),
    data: UploadFile = File(None),
    db: Session = Depends(Sql.get_session),
):
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )

    if data and data.content_type not in [
        "application/zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Поддерживаемые форматы '.zip' '.docx'",
        )

    return await CourseController(db).create_course(
        payload,
        data.file.read() if data else None,
        data.filename if data else None,
        data.content_type if data else None,
    )
    # try:

    # except Exception as e:
    #     print(e)
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="Такой курс уже существует"
    #     )


@router.get("/onboarding")
async def get_onboarding(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> CourseDto:
    try:
        return await CourseController(db).get_course(1)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Курс не найден"
        )


@router.post("/onboarding")
async def create_onboarding(
    payload: CourseCreate = Depends(),
    user: UserTokenData = Depends(get_current_user),
    data: UploadFile = File(None),
    db: Session = Depends(Sql.get_session),
):
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )

    if data and data.content_type not in [
        "application/zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Поддерживаемые форматы '.zip' '.docx'",
        )
    return await CourseController(db).update_onboarding(
        payload,
        data.file.read() if data else None,
        data.filename if data else None,
        data.content_type if data else None,
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


@router.get("/id/{course_id}")
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
