import typing as tp
import logging

from sqlalchemy.orm import Session

from app.auth import PasswordManager

from app.models.user import UserCreate
from app.models.position import PositionCreate
import pandas as pd
from app.worker import user_create_notification

from app import crud


class AdminController:
    def __init__(self, db: Session):
        self.db = db

    async def load_user_data(self, payload: tp.BinaryIO):
        """
        Загрузка данных из сторонней системы

        - Создание пользователей в нашей системе
        - Установление связи Руководитель/Сотрудник (который проходит адаптацию)


        """
        df = pd.read_csv(payload)
        positions = set(df["Профессия"])
        for position in positions:
            await crud.position.create(self.db, PositionCreate(name=position))
        for _, user in df.iterrows():
            password = PasswordManager.generate_password()
            fio = user["ФИО"]
            supervisor_fio = user["ФИО руководителя"]

            last_name, middle_name, first_name = fio.split(" ")
            print(last_name, middle_name, first_name, supervisor_fio)
            hashed_password = PasswordManager.hash_password(password)
            try:
                crud.user.get_user_by_email(self.db, user["Почта"])
                continue

            except Exception as e:
                print(e)
                mentor = crud.user.get_user_by_fio(self.db, supervisor_fio)

                mentee = crud.user.create_user(
                    self.db,
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
                await crud.user.assign_mentee(self.db, mentor.id, mentee.id)
                logging.info(f"User {user['Почта']} created with password {password}")
                user_create_notification(
                    fio=fio, email=user["Почта"], password=password
                )
