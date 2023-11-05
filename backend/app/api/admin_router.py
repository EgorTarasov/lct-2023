import pandas as pd
from fastapi import APIRouter, Depends, UploadFile, File
import logging

from sqlalchemy.orm import Session

from app import crud
from app.auth import PasswordManager
from app.core.sql import Sql
# from app.dependencies.role_checker import RoleChecker
from app.mailing import EmailService
from app.mailing.service import get_mail_service
from app.models.user import UserCreate

# allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])  # dependencies=[Depends(allow_create_resource)]


@router.post("/register-new-users", response_model=bool)
async def register_new_user(file: UploadFile = File(...),
                            mail_service: EmailService = Depends(get_mail_service),
                            db: Session = Depends(Sql.get_session)):
    """
            CSV файл с кодировкой UTF-8, в котором существует колонки - Почта и ФИО
            Пример файла:
            Почта,ФИО
            test@gmail.com, Константинопольский Константин Константинович
            kondrandr2004+1@yandex.ru, Кондратьев Андрей Антонович
            kondrandr2004+2@yandex.ru, Кондратьев Сергей Антонович
    """
    df = pd.read_csv(file.file)
    for index, user in df.iterrows():
        password = PasswordManager.generate_password()
        data = {
            "name": user["ФИО"],
            "new_password": password
        }
        last_name, middle_name, first_name = user["ФИО"].split(" ")
        hashed_password = PasswordManager.hash_password(password)
        try:
            existed_user = await crud.user.get_user_by_email(db, user["Почта"])
            continue
        except Exception as e:
            await crud.user.create_user(db, UserCreate(email=user["Почта"], password=hashed_password, role_id=1,
                                                       last_name=last_name, middle_name=middle_name, first_name=first_name,
                                                       gender="Male"))
            # TODO отправить письмо на почту
            # try:
            #     await mail_service.send_mailing(to=user["Почта"], subject="Регистрация на сервисе для адаптации",
            #                                     template="test.jinja", data=data)
            # except Exception as e:
            #     print(e)
            #     logging.error(f"Can't send email to {user['Почта']}: {e}")
    return True
