import logging
from sqlalchemy.orm import Session
from app.models.quiz import QuizCreate, SqlAnswer, SqlQuiz, SqlQuestion
from app.auth.jwt import UserTokenData


async def create_quiz(db: Session, quiz: QuizCreate) -> SqlQuiz:
    db_quiz = SqlQuiz(
        title=quiz.title,
        description_text=quiz.description_text,
    )

    if quiz.questions:
        db_questions = [
            SqlQuestion(
                question_text=question.question_text,
                answer=question.answer,
            )
            for question in quiz.questions
        ]
        db.add(db_quiz)
        db_quiz.questions = db_questions
    else:
        db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    return db_quiz


async def get_quiz_with_answers(
    db: Session, quiz_id: int, user_id: int
) -> tuple[SqlQuiz, list]:
    """Получение теста по id для страницы с тестом
    Raises:
        Exception: курс не найден

    Returns:
        tuple[SqlQuiz, list]: данные теста и ответы пользователя
    """
    db_quiz = db.query(SqlQuiz).filter(SqlQuiz.id == quiz_id).first()
    # take only last attempts
    answers = (
        db.query(
            SqlQuestion.id,
            SqlQuestion.question_text,
            SqlAnswer.is_correct,
            SqlAnswer.answer_text,
        )
        .join(SqlAnswer)
        .filter(SqlQuestion.id == SqlAnswer.question_id)
        .filter(SqlQuestion.quiz_id == quiz_id)
        .filter(SqlAnswer.user_id == user_id)
        .all()
    )
    if not db_quiz:
        raise Exception("Quiz not found")
    return db_quiz, answers


async def get_quiz(db: Session, quiz_id: int) -> SqlQuiz:
    """
    Получение теста по id для страницы с тестом (без ответов пользователя)
    """
    db_quiz = db.query(SqlQuiz).filter(SqlQuiz.id == quiz_id).first()
    if not db_quiz:
        raise Exception("Quiz not found")
    return db_quiz


async def get_question(db: Session, question_id: int) -> SqlQuestion:
    db_question = db.query(SqlQuestion).filter(SqlQuestion.id == question_id).first()
    if not db_question:
        raise Exception("Question not found")
    return db_question


async def create_answer(
    db: Session, question_id: int, user_id: int, answer: str, is_correct: bool = False
) -> SqlAnswer:

    try:
        db_answer = SqlAnswer(
            question_id=question_id,
            user_id=user_id,
            answer_text=answer,
            is_correct=is_correct,
        )
        db.add(db_answer)
        db.commit()
        db.refresh(db_answer)
    except Exception as e:
        logging.error(e)
        raise Exception("Answer not created, invalid question_id or user_id")

    return db_answer
