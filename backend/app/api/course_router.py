"""
post создать skill

"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.course_controller import CourseController
from app.core.sql import Sql
from app.models.course import CourseDto, BaseCourse
from app import utils

router = APIRouter(prefix="/course", tags=["course"])


@router.post("/")
async def create_course(
        data: list[UploadFile],
        payload: BaseCourse = Depends(),
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )
    for f in data:
        print(f.filename)
        if not f.filename.split(".")[-1] in ["docx"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Поддерживаемые форматы '.zip' '.docx'",
            )
    return await CourseController(db).create_course(payload, data)
    # try:

    # except Exception as e:
    #     print(e)
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="Такой курс уже существует"
    #     )


@router.get("/")
async def get_all_courses(
        _: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> list[CourseDto]:
    try:
        return await CourseController(db).get_all_courses()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Такой курс уже существует"
        )


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
        files: list[UploadFile],
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    if user.role_id == 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
        )
    for f in files:
        if not f.filename.split(".")[-1] in ["docx"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Поддерживаемые форматы '.zip' '.docx'",
            )
    return await CourseController(db).update_onboarding(files)
    # try:


# @router.post("/onboarding")
# async def create_onboarding(
#     user: UserTokenData = Depends(get_current_user),
#     data: UploadFile = File(None),
#     db: Session = Depends(Sql.get_session),
# ):
#     if user.role_id == 1:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён"
#         )
#     if data and data.content_type not in [
#         "application/x-zip-compressed",
#         "application/zip",
#         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
#     ]:
#         raise HTTPException(
#             status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#             detail="Поддерживаемые форматы '.zip' '.docx'",
#         )
#     return await CourseController(db).update_onboarding(
#         data.file.read() if data else None,
#         data.filename if data else None,
#         data.content_type if data else None,
#     )


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


@router.get("/get-onboarding-progress", response_model=int)
async def get_progress(
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> int:
    """Возвращает процент завершенности онбординга = кол-во правильно пройденных тестов / кол-во тестов"""
    return await CourseController(db).get_course_progress(user.user_id, 1)


@router.put("/{course_id}")
async def edit_course(
        data: list[UploadFile],
        course_id: int,
        _: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    course = await CourseController(db).get_course(course_id)
    for f in data:
        print(f.filename)
        if not f.filename.split(".")[-1] in ["docx"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Поддерживаемые форматы '.zip' '.docx'",
            )
    return await CourseController(db).update_course(course, data)


@router.delete("/{course_id}")
async def delete_course(
        course_id: int,
        _: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    return await CourseController(db).delete_course(course_id)
