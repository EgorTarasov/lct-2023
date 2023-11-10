from fastapi.background import P
from sqlalchemy.orm import Session

from app.models.action import ActionCreate, ActionType
from app.models.quiz import (
    QuestionDto,
    QuestionWithAnswerDto,
    QuestionWithUserAnswerDto,
    QuizCreate,
    QuizDto,
    AnswerDto,
    QuizWithAnswersDto,
    QuizDescription,
)
from app import crud
from app.auth.jwt import UserTokenData


class QuizController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_quiz(self, quiz: QuizCreate):
        db_quiz = await crud.quiz.create_quiz(self.db, quiz)
        return QuizDto.model_validate(db_quiz)

    async def get_quizes(self) -> list[QuizDescription]:
        db_quizes = await crud.quiz.get_all(self.db)
        # как убрать поле с вопросами?)
        return [QuizDescription.model_validate(quiz) for quiz in db_quizes]

    async def get_quiz(
        self, quiz_id: int, user: UserTokenData
    ) -> QuizWithAnswersDto | QuizDto:
        """Если пользователь уже отвечал на тест, то возвращается QuizWithAnswersDto, иначе QuizDto

        Args:
            quiz_id (int): _description_
            user (UserTokenData): _description_

        Returns:
            QuizWithAnswersDto | QuizDto: _description_
        """
        db_quiz, answers = await crud.quiz.get_quiz_with_answers(
            self.db, quiz_id, user.user_id
        )
        questions = []
        if answers:
            questions = [
                QuestionWithUserAnswerDto.model_validate(
                    {
                        "id": answer[0],
                        "question_text": answer[1],
                        "is_correct": answer[2] if answer[2] else False,
                        "answer_text": answer[3],
                    }
                )
                for answer in answers
            ]

            return QuizWithAnswersDto.model_validate(
                {
                    "id": db_quiz.id,
                    "title": db_quiz.title,
                    "description_text": db_quiz.description_text,
                    "questions": questions,
                }
            )
        else:
            return QuizDto.model_validate(db_quiz)

    async def get_question(self, question_id: int, user: UserTokenData):
        db_question = await crud.quiz.get_question(self.db, question_id)

        if user.role_id == 2:
            print(db_question)
            res = QuestionWithAnswerDto.model_validate(db_question)
            print(res)
            return res
        else:
            return QuestionDto.model_validate(db_question)

    async def submit_answer(self, question_id: int, user: UserTokenData, answer: str):
        db_question = await crud.quiz.get_question(self.db, question_id)
        db_answer = await crud.quiz.create_answer(
            self.db, question_id, user.user_id, answer, db_question.answer == answer
        )
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.enroll_on_event, user_id=user.user_id))
        return AnswerDto.model_validate(db_answer)
