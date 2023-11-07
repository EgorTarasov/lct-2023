from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user

from app.auth.jwt import UserTokenData
from app.controllers.skill_controller import SkillController
from app.core.sql import Sql

from app.models.skill import SkillCreate, SkillDto
from app.models.question import (
    QuestinSubmissionBase,
    QuestionCreate,
    QuestionDto,
    QuestionSubmissionCreate,
)


router = APIRouter(prefix="/skill", tags=["skill"])


@router.post("/")
async def create_skill(
    payload: SkillCreate,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> SkillDto:
    try:
        return await SkillController(db).create_skill(payload)
    except:
        raise Exception("Skill already exists")


@router.get("/{course_id}")
async def get_skills_for_course(
    course_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[SkillDto]:
    try:
        return await SkillController(db).get_skills(course_id)
    except:
        raise Exception("Course not found")


question_router = APIRouter(prefix="/question", tags=["question"])


@question_router.post("/")
async def create_question(
    payload: QuestionCreate,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> QuestionDto:
    try:
        return await SkillController(db).create_question(payload)
    except:
        raise Exception("Question already exists")


@question_router.get("/{skill_id}")
async def get_questions(
    skill_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> list[QuestionDto]:
    try:
        return await SkillController(db).get_questions(skill_id)
    except:
        raise Exception("Question not found")


@question_router.get("/byid/{question_id}")
async def get_question(
    question_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> QuestionDto:
    try:
        return await SkillController(db).get_question(question_id)
    except:
        raise Exception("Question not found")


@question_router.post("/{question_id}")
async def submit_answer(
    question_id: int,
    payload: QuestinSubmissionBase,
    user: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
):
    data = payload.model_dump()
    data["user_id"] = user.user_id
    data["question_id"] = question_id
    payload = QuestionSubmissionCreate.model_validate(data)
    try:
        return await SkillController(db).submit_answer(payload)
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, str(e))


router.include_router(question_router)
