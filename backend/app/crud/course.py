from sqlalchemy.orm import Session

from ..models.course import SqlCourse, CourseCreate, CourseDto


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
