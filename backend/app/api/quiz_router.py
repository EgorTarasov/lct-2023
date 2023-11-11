from fastapi import APIRouter, Body, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.core.sql import Sql

from app.models.quiz import QuizDescription, QuizCreate, QuizDto, QuizWithAnswersDto
from app.controllers.quiz_controller import QuizController
from app.auth.dependency import get_current_user
from app.auth.jwt import UserTokenData


router = APIRouter(prefix="/quiz", tags=["quiz"])


@router.post("/", response_model=QuizDto)
async def create_quiz(
    name: str,
    score: int,
    file: UploadFile = File(...),
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    quiz_controller = QuizController(db)
    quiz = await quiz_controller.create_quiz(file, name)
    return quiz


@router.get("/quiz/{quiz_id}")
async def get_quiz(
    quiz_id: int,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> QuizDto | QuizWithAnswersDto:
    """
    Получение теста по id для страницы с тестом
    Если у пользователя уже есть попытки с ответом на вопросы, то отображаем is_correct

    """
    quiz_controller = QuizController(db)
    quiz = await quiz_controller.get_quiz(quiz_id, user)
    return quiz


@router.get("/all", tags=["course"])
async def get_all_quizes(
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[QuizDescription]:
    quiz_controller = QuizController(db)
    quizes = await quiz_controller.get_quizes()

    return quizes


@router.get("/question/{question_id}")
async def get_question(
    question_id: int,
    userTokenData: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    """
    Получение вопроса по id для страницы с тестом
    """
    controller = QuizController(db)
    question = await controller.get_question(question_id, userTokenData)

    return question


@router.post("/question/{question_id}")
async def submit_answer(
    question_id: int,
    answer: list[str] = Body(..., description="Ответ на вопрос", example=["a", "b"]),
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    quiz_controller = QuizController(db)
    return await quiz_controller.submit_answer(question_id, user, answer)
