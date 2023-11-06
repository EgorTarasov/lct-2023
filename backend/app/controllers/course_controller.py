from sqlalchemy.orm import Session

from app.models.course import CourseCreate, CourseDto

from app import crud


class CourseController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create_course(self, payload: CourseCreate) -> CourseDto:
        """
        Создать курс
        """
        db_course = await crud.course.create(self.db, payload)

        return CourseDto.model_validate(db_course)

    async def get_course(self, course_id: int) -> CourseDto:
        """
        Получить курс
        """
        db_course = await crud.course.get(self.db, course_id)

        return CourseDto.model_validate(db_course)
