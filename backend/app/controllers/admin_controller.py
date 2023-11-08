import datetime

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
        positions = set(df["Должность"])
        for position in positions:
            await crud.position.create(self.db, PositionCreate(name=position))
        for _, user in df.iterrows():
            fio = user["ФИО"]
            supervisor_fio = user["ФИО Руководителя"]
            date_with_year = f'{user["День выхода"]}.{datetime.datetime.now().year}'
            starts_work_at = datetime.datetime.strptime(date_with_year, "%d.%m.%Y").date()
            password = PasswordManager.generate_password()
            last_name, middle_name, first_name = fio.split(" ")
            print(last_name, middle_name, first_name, supervisor_fio)
            try:
                crud.user.get_user_by_email(self.db, user["Почта"])
                continue

            except Exception as e:
                print(e)
                mentor = crud.user.get_user_by_fio(self.db, supervisor_fio)
                position = await crud.position.get_position_by_name(self.db, user["Должность"])
                mentee = crud.user.create_user(
                    self.db,
                    UserCreate(
                        email=user["Почта"],
                        role_id=1,
                        position_id=position.id,
                        last_name=last_name,
                        middle_name=middle_name,
                        first_name=first_name,
                        starts_work_at=starts_work_at,
                        number=user["Номер телефона"]
                    ),
                    password
                )
                await crud.user.assign_mentee(self.db, mentor.id, mentee.id)

