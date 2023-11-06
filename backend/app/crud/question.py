from sqlalchemy.orm import Session

from app.models.question import (
    QuestionCreate,
    SqlQuestion,
    QuestionSubmissionCreate,
    SqlQuestionSubmission,
)


async def create(db: Session, payload: QuestionCreate) -> SqlQuestion:
    db_question = SqlQuestion(**payload.model_dump())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    return db_question


async def get_by_id(db: Session, question_id: int) -> SqlQuestion:
    question = db.query(SqlQuestion).filter(SqlQuestion.id == question_id).first()
    if question is None:
        raise Exception("Question not found")
    return question


async def get_all(db: Session, skill_id: int) -> list[SqlQuestion]:

    return db.query(SqlQuestion).filter(SqlQuestion.skill_id == skill_id).all()


async def save_submission(
    db: Session, submission: QuestionSubmissionCreate
) -> SqlQuestionSubmission:
    db_submission = SqlQuestionSubmission(**submission.model_dump())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission
