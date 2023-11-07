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
from app.core.sql import Sql
from app.controllers.admin_controller import AdminController

# from app.dependencies.role_checker import RoleChecker


# allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/register-new-users", response_model=bool)
async def register_new_user(
    file: UploadFile = File(...),
    db: Session = Depends(Sql.get_session),
):
    """
    CSV файл с кодировкой UTF-8, в котором существует колонки - Почта и ФИО
    Пример файла:\n
    Почта,ФИО,ФИО Руководителя, Профессия
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
