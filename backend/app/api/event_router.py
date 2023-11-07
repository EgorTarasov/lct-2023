from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging

from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData
from app.controllers.event_controller import EventController
from app.core.sql import Sql
from app.models.event import EventDto, EventCreate

router = APIRouter(prefix="/event", tags=["event"])


@router.get("/my", response_model=list[EventDto])
async def get_user_events(
        db: Session = Depends(Sql.get_session),
        user: UserTokenData = Depends(get_current_user)
):
    """Список всех мероприятий для пользователя с полем, записан ли он на события или нет"""
    try:
        return await EventController(db).get_events(user.user_id)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/", response_model=list[EventDto])
async def get_events(
        db: Session = Depends(Sql.get_session),
        _: UserTokenData = Depends(get_current_user),
):
    """Список всех мероприятий"""
    try:
        return await EventController(db).get_events()
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/", response_model=EventDto)
async def create_event(
        event_data: EventCreate,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> EventDto:
    """Создание мероприятия ментором"""
    if user.role_id == 1:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещён")
    try:
        return await EventController(db).create_event(event_data)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.post("/enroll/{event_id}", response_model=bool)
async def enroll_on_event(
        event_id: int,
        user: UserTokenData = Depends(get_current_user),
        db: Session = Depends(Sql.get_session)
) -> bool:
    """Записаться на мероприятие"""
    try:
        return await EventController(db).enroll_on_event(event_id, user_id=user.user_id)
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
