import logging

import aiofiles
import pandas as pd
from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.analytic_controller import AnalyticController
from app.controllers.course_controller import CourseController
from app.controllers.quiz_controller import QuizController
from app.controllers.user_controller import UserController
from app.core.sql import Sql
from app.models.action import ActionDto
from app.models.user import get_fullname_for_user

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/actions")
async def get_statistics_on_users_actions(
        _: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> FileResponse:
    actions = await AnalyticController(db).get_actions()
    headers = ['ФИО', 'Почта', 'Специальность', 'Действие', 'Доп. информация', 'Время']
    data = [[
        get_fullname_for_user(action.user),
        action.user.email,
        action.user.position.name,
        action.action,
        action.data,
        str(action.created_at),
    ] for action in actions]

    df = pd.DataFrame(data, columns=headers)
    excel_file = 'action_statistics.xlsx'
    df.to_excel(excel_file, index=False)

    return FileResponse(excel_file, filename='action_statistics.xlsx')


@router.get("/onboarding")
async def get_statistics_on_users_onboarding(
        _: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session),
) -> FileResponse:
    users = UserController(db).get_users()
    headers = ['ФИО', 'Почта', 'Специальность', 'Дата регистрации', 'Прогресс онбординга (%)',
               'Последнее прохождение этапа онбординга в', 'Курсов пройдено', 'Дедлайнов просрочено']
    data = []
    for user in users:
        try:
            print(user.email, str((await AnalyticController(db).get_actions_by_user_id(user.id))[0].created_at))
            registration_datetime = str((await AnalyticController(db).get_actions_by_user_id(user.id))[0].created_at)
            user_data = [
                get_fullname_for_user(user),
                user.email,
                user.position.name,
                registration_datetime,
                await CourseController(db).get_course_progress(user.id, 1),
                0,
                0
            ]
            last_answer = QuizController(db).get_last_answer(user.id)
            if last_answer:
                user_data.append(str(last_answer.created_at))
            else:
                user_data.append(registration_datetime)
            data.append(user_data)
        except Exception as e:
            logging.error(f"Отчёт по онбордингу: {e}")
            continue
    df = pd.DataFrame(data, columns=headers)
    excel_file = 'onboarding_statistics.xlsx'
    df.to_excel(excel_file, index=False)

    return FileResponse(excel_file, filename='onboarding_statistics.xlsx')
