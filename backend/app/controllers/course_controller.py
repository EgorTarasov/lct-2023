import typing as tp
from sqlalchemy.orm import Session

from app.models.course import CourseCreate, CourseDto
from .file_controller import FileController

from app import crud


class CourseController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_course(
        self, payload: CourseCreate, file: bytes, filename: str
    ) -> CourseDto:
        """
        Создать курс
        """
        # TODO: если zip, то распаковать и вернуть вместе с курсом

        db_files = [await FileController(self.db).save_file(file, filename)]
        db_course = await crud.course.create(self.db, payload)
        quizes = await crud.quiz.get_quizes(self.db, payload.quizes)
        db_course = await crud.course.assign_quizes(self.db, db_course, quizes)
        db_course = await crud.course.assign_files(self.db, db_course, db_files)
        return CourseDto.model_validate(db_course)

    async def get_course(self, course_id: int) -> CourseDto:
        """
        Получить курс по id
        """
        db_course = await crud.course.get(self.db, course_id)

        return CourseDto.model_validate(db_course)

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
