from typing import Type
from sqlalchemy.orm import Session

from ..models.file import SqlFile
from ..models.quiz import SqlQuiz
from ..models.course import SqlCourse, CourseCreate, QuizCourse
from ..models.position import SqlPosition


async def update_endpoints(
    db: Session, payload: CourseCreate, course_id: int
) -> SqlCourse:
    db_course = db.query(SqlCourse).filter(SqlCourse.id == 1).first()
    print(db_course)
    if not db_course:
        db_course = SqlCourse(
            name="Общий онбординг",
            duration=0,
        )
    else:
        db_course.name = "Общий онбординг"
        db_course.duration = 0
        db_course.quizes = []
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course


async def create(db: Session, payload: CourseCreate) -> SqlCourse:
    db_course = SqlCourse(**payload.model_dump())

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


async def delete(db: Session, course_id: int):
    db_course = db.query(SqlCourse).filter(SqlCourse.id == course_id).first()
    db.delete(db_course)
    db.commit()


async def change_course(db: Session, course_id: int, payload: CourseCreate):
    db_course = db.query(SqlCourse).filter(SqlCourse.id == course_id).first()
    if not db_course:
        raise Exception("Такого курса не существует")
    for key, value in payload.model_dump().items():
        setattr(db_course, key, value) if value else None
    db.commit()


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


async def assign_files(db: Session, course: SqlCourse, files: list[SqlFile]):
    course.files = files
    db.add(course)
    db.commit()
    db.refresh(course)
    return course
