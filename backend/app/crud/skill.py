from sqlalchemy.orm import Session

from app.models.skill import SqlSkill, SkillCreate
from app.models.course import SqlCourse


async def create(db: Session, payload: SkillCreate) -> SqlSkill:
    db_skill = SqlSkill(**payload.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)

    return db_skill


async def get_all(db: Session, course_id: int) -> list[SqlSkill]:
    course = db.query(SqlCourse).filter(SqlCourse.id == course_id).first()
    if course is None:
        raise Exception("Course not found")
    return course.skills
