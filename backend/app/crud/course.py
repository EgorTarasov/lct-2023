from typing import Type
from sqlalchemy.orm import Session

from ..models.quiz import SqlQuiz

from ..models.course import SqlCourse, CourseCreate, QuizCourse
from ..models.position import SqlPosition


async def create(db: Session, payload: CourseCreate) -> SqlCourse:
    db_course = SqlCourse(name=payload.name, duration=payload.duration)

    db.add(db_course)
    db.commit()
    db.refresh(db_course)

    return db_course


async def get(db: Session, course_id: int) -> SqlCourse:
    db_course = db.query(SqlCourse).filter(SqlCourse.id == course_id).first()
    if not db_course:
        raise Exception("Course not found")
    return db_course


async def get_all(db: Session) -> list[SqlCourse]:
    db_courses = db.query(SqlCourse).all()
    return db_courses


async def get_for_position(db: Session, position_id: int) -> list[SqlCourse]:
    db_position = db.query(SqlPosition).filter(SqlPosition.id == position_id).first()
    if not db_position:
        raise Exception("Такой позиции не существует")
    return db_position.courses


async def assign_quizes(db: Session, course: SqlCourse, quizes: list[SqlQuiz]):
    course.quizes = quizes
    db.add(course)
    db.commit()
    db.refresh(course)
    return course
