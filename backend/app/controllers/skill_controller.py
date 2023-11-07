import logging
from sqlalchemy.orm import Session
from app.models.skill import SkillCreate, SkillDto
from app import crud
from app.models.question import QuestionCreate, QuestionDto, QuestionSubmissionCreate


class SkillController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_skill(self, payload: SkillCreate) -> SkillDto:
        """
        Создать skill
        """
        db_skill = await crud.skill.create(self.db, payload)

        return SkillDto.model_validate(db_skill)

    async def get_skills(self, course_id: int) -> list[SkillDto]:
        """Получение всех навыков для курса"""

        db_skills = await crud.skill.get_all(self.db, course_id)

        return [SkillDto.model_validate(db_skill) for db_skill in db_skills]

    async def create_question(self, payload: QuestionCreate) -> QuestionDto:
        db_question = await crud.question.create(self.db, payload)

        return QuestionDto.model_validate(db_question)

    async def get_question(self, question_id: int) -> QuestionDto:
        db_question = await crud.question.get_by_id(self.db, question_id)

        return QuestionDto.model_validate(db_question)

    async def get_questions(self, skill_id: int) -> list[QuestionDto]:
        db_questions = await crud.question.get_all(self.db, skill_id)
        return [QuestionDto.model_validate(obj) for obj in db_questions]

    async def submit_answer(self, payload: QuestionSubmissionCreate) -> bool:
        """
        Проверяет ответ пользователя и сохраняет его в бд
        """
        try:
            # TODO: а что делать, если текст внутри ответа?
            submission = await crud.question.save_submission(self.db, payload)
            question = await crud.question.get_by_id(self.db, payload.question_id)

            return submission.answer == question.answer
        except Exception as e:
            logging.error(str(e))
            raise Exception("Invalid fk")
