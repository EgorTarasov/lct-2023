from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.action import ActionCreate, ActionType
from app.models.quiz import (
    QuestionInfo,
    QuestionWithAnswerDto,
    UserAnswerDto,
    QuizCreate,
    QuizDto,
    AnswerDto,
    QuizWithAnswersDto,
    QuizDescription,
)
from app import crud, utils
from app.auth.jwt import UserTokenData
from app.controllers.file_controller import FileController
from app.worker import generate_quiz


class QuizController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_quiz(self, file: UploadFile, name: str):
        # создаем пустой quiz и передаем его id в worker
        f = FileController(self.db)
        db_file = await f.save_file(await file.read(), file.filename)

        quiz = utils.load_questions(file.filename, db_file.id)

        # quiz = QuizCreate.model_validate(data)

        quiz.title = name
        db_quiz = crud.quiz.create_quiz(self.db, quiz)

        if db_quiz.description_text == "":
            generate_quiz.delay(db_quiz.id, db_file.id)
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
                UserAnswerDto.model_validate(
                    {
                        "question_id": answer[0],
                        "question_text": answer[1],
                        "is_correct": answer[2] if answer[2] else False,
                        "answer": answer[3],
                    }
                )
                for answer in answers
            ]
            return QuizDto.model_validate(db_quiz)
            # return QuizWithAnswersDto.model_validate(
            #     {
            #         "id": db_quiz.id,
            #         "title": db_quiz.title,
            #         "description_text": db_quiz.description_text,
            #         "questions": questions,
            #     }
            # )
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
            return QuestionInfo.model_validate(db_question)

    async def submit_answer(self, question_id: int, user: UserTokenData, answer: str):
        db_question = await crud.quiz.get_question(self.db, question_id)

        db_answer = await crud.quiz.create_answer(
            self.db, question_id, user.user_id, [answer], answer in db_question.answer
        )
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.submit_answer, user_id=user.user_id),
        )
        return AnswerDto.model_validate(db_answer)

    def get_last_answer(self, user_id: int) -> AnswerDto | None:
        db_answer = crud.quiz.get_last_answer(self.db, user_id)
        if db_answer:
            return AnswerDto.model_validate(db_answer)
        return db_answer
