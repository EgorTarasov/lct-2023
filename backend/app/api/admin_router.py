import email
import pandas as pd
from fastapi import APIRouter, Depends, UploadFile, File
import logging

from sqlalchemy.orm import Session

from app import crud
from app.auth import PasswordManager
from app.core.sql import Sql

# from app.dependencies.role_checker import RoleChecker

from app.models.user import UserCreate
from app.worker import user_create_notification

# allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(
    prefix="/admin", tags=["admin"]
)  # dependencies=[Depends(allow_create_resource)]


@router.post("/register-new-users", response_model=bool)
async def register_new_user(
    file: UploadFile = File(...),
    db: Session = Depends(Sql.get_session),
):
    """
    CSV файл с кодировкой UTF-8, в котором существует колонки - Почта и ФИО
    Пример файла:
    Почта,ФИО
    test@gmail.com, Константинопольский Константин Константинович
    kondrandr2004+1@yandex.ru, Кондратьев Андрей Антонович
    kondrandr2004+2@yandex.ru, Кондратьев Сергей Антонович
    """
    df = pd.read_csv(file.file)
    for _, user in df.iterrows():
        password = PasswordManager.generate_password()
        fio = user["ФИО"]
        last_name, middle_name, first_name = fio.split(" ")
        hashed_password = PasswordManager.hash_password(password)
        try:
            await crud.user.get_user_by_email(db, user["Почта"])
            continue
        except Exception:
            await crud.user.create_user(
                db,
                UserCreate(
                    email=user["Почта"],
                    password=hashed_password,
                    role_id=1,
                    last_name=last_name,
                    middle_name=middle_name,
                    first_name=first_name,
                    gender="Male",
                ),
            )
            logging.info(f"User {user['Почта']} created with password {password}")
            user_create_notification(fio=fio, email=user["Почта"], password=password)

    return True
