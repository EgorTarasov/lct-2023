from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
    status,
    Response,
)

from sqlalchemy.orm import Session

from app import crud
from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.user_controller import UserController
from app.core.sql import Sql
from app.controllers.admin_controller import AdminController
from app.models.user import UserCreate

# from app.dependencies.role_checker import RoleChecker


# allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/register")
async def register_user(
        payload: UserCreate,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")
    mentee = await UserController(db).create_user(payload)
    await crud.user.assign_mentee(db, user.user_id, mentee.id)
    if not mentee:
        raise HTTPException(status_code=400, detail="Пользователь уже существует")
    return mentee


@router.post("/register-new-users", response_model=bool)
async def register_user_from_file(
        file: UploadFile = File(...),
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
):
    """
    CSV файл с кодировкой UTF-8
    Пример файла:\n
    Почта, ФИО, Номер телефона, ФИО Руководителя, Должность, День выхода (в формате DD.MM), Цель адаптации
    """
    print(file.content_type)
    controller = AdminController(db)

    if file.content_type == "text/csv":
        try:
            await controller.load_user_data(file.file)
            return Response(status.HTTP_200_OK)
        except Exception as e:
            print(e)
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Не верный формат .csv")
    raise HTTPException(
        status.HTTP_400_BAD_REQUEST, "Неверный формат файла, требуется .csv"
    )
