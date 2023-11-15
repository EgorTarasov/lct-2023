import typing as tp
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.course import BaseCourse, CourseDto, CourseCreate
from .quiz_controller import QuizController
from .file_controller import FileController

from app import crud
from app import utils


class CourseController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def update_onboarding(
        self,
        files: list[UploadFile],
    ) -> CourseDto:

        db_course = await crud.course.update_endpoints(self.db, None, course_id=1)
        quizes = []
        q = QuizController(self.db)
        quizes = [await q.create_quiz(file, file.filename) for file in files]
        db_quizes = await crud.quiz.get_quizes(self.db, [quiz.id for quiz in quizes])

        db_course = await crud.course.assign_quizes(self.db, db_course, db_quizes)
        if files:
            f_controller = FileController(self.db)
            db_files = [crud.file.get(self.db, q.file.id) for q in quizes]
            db_course = await crud.course.assign_files(self.db, db_course, db_files)
        return CourseDto.model_validate(db_course)

    async def create_course(
        self,
        payload: BaseCourse,
        files: list[UploadFile] | None,
    ) -> CourseDto:
        """
        Создать курс
        """

        db_course = await crud.course.create(self.db, payload)
        q = QuizController(self.db)
        # test files -> create quiz for each file
        # else -> create empty quiz

        quizes = [await q.create_quiz(file, file.filename) for file in files]
        db_quizes = await crud.quiz.get_quizes(self.db, [quiz.id for quiz in quizes])
        db_course = await crud.course.assign_quizes(self.db, db_course, db_quizes)
        if files:
            f_controller = FileController(self.db)
            db_files = [crud.file.get(self.db, q.file.id) for q in quizes]
            # db_files = [
            #     await f_controller.save_file(await file.read(), file.filename)
            #     for file in files
            # ]

            # if utils.check_content_type(filetype):
            #     db_files = await f_controller.save_files(file, filename)
            # else:
            #     db_files = [await f_controller.save_file(file, filename)]
            db_course = await crud.course.assign_files(self.db, db_course, db_files)

        return CourseDto.model_validate(db_course)

    async def get_course(self, course_id: int) -> CourseDto:
        """
        Получить курс по id
        """
        db_course = await crud.course.get(self.db, course_id)

        return CourseDto.model_validate(db_course)

    async def get_all_courses(self) -> list[CourseDto]:
        """
        Получить все
        """
        db_courses = await crud.course.get_all(self.db)

        return [CourseDto.model_validate(db_course) for db_course in db_courses]

    async def change_course(
        self,
        course_id: int,
        payload: CourseCreate,
        file: bytes | None = None,
        filename: str = "test.docx",
        filetype: tp.Literal[
            "application/zip",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ):
        """
        Изменить курс по id
        """
        await crud.course.change_course(self.db, course_id, payload)

    async def delete_course(self, course_id: int):
        """
        Удалить курс по id
        """
        if course_id == 1:
            return None

        await crud.course.delete(self.db, course_id)

    async def get_courses_by_position(self, position_id: int) -> list[CourseDto]:
        """
        Получить курсы по позиции
        """
        db_courses = await crud.course.get_for_position(self.db, position_id)

        return [CourseDto.model_validate(course) for course in db_courses]

    async def get_courses(self, user_id: int) -> list[CourseDto]:
        """
        Получить курсы пользователя
        """
        db_user = await crud.user.get_user_by_id(self.db, user_id)
        db_courses = await crud.course.get_for_position(self.db, db_user.position_id)

        return [CourseDto.model_validate(course) for course in db_courses]

    async def get_course_progress(self, user_id: int, course_id: int) -> int:
        """
        Получить прогресс пользователя по курсу
        """
        db_onboarding = await crud.course.get(self.db, course_id)
        correct_answers = 0
        for quiz in db_onboarding.quizes:
            db_quiz, answers = await crud.quiz.get_quiz_with_answers(
                self.db, quiz.id, user_id
            )
            if all(answer[2] for answer in answers):
                correct_answers += 1
        return round(correct_answers / max(1, len(db_onboarding.quizes)) * 100)
