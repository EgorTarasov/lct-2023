import typing as tp
from sqlalchemy.orm import Session

from app.models.course import CourseCreate, CourseDto
from .file_controller import FileController

from app import crud
from app import utils


class CourseController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def update_onboarding(
        self,
        file: bytes | None,
        filename: str | None = "test.docx",
        filetype: str | None = None,
    ) -> CourseDto:

        db_course = await crud.course.update_endpoints(self.db, None, course_id=1)
        quizes = await crud.quiz.get_quizes(self.db, None)
        db_course = await crud.course.assign_quizes(self.db, db_course, quizes)
        if file:
            f_controller = FileController(self.db)
            db_files = []
            if (
                filetype == "application/zip"
                or filetype == "application/x-zip-compressed"
            ):
                db_files = await f_controller.save_files(file, filename)
            else:
                db_files = [await f_controller.save_file(file, filename)]
            db_course = await crud.course.assign_files(self.db, db_course, db_files)

        return CourseDto.model_validate(db_course)

    async def create_course(
        self,
        payload: CourseCreate,
        file: bytes | None,
        filename: str = "test.docx",
        filetype: tp.Literal[
            "application/zip",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ) -> CourseDto:
        """
        Создать курс
        """
        # TODO: если zip, то распаковать и вернуть вместе с курсом

        db_course = await crud.course.create(self.db, payload)
        quizes = await crud.quiz.get_quizes(self.db, payload.quzes)
        db_course = await crud.course.assign_quizes(self.db, db_course, quizes)
        if file:
            f_controller = FileController(self.db)
            db_files = []
            if utils.check_content_type(filetype):
                db_files = await f_controller.save_files(file, filename)
            else:
                db_files = [await f_controller.save_file(file, filename)]
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
