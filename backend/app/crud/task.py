from sqlalchemy.orm import Session

from app.models.taskspy import TaskCreate, SqlTask, TaskDto


async def create_task(db: Session, payload: TaskCreate, mentor_id) -> SqlTask:
    """Создание задачи"""
    db_task = SqlTask(**payload.model_dump(), mentor_id=mentor_id)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


async def get_tasks(db: Session, user_id: int) -> list[TaskDto]:
    """Получение задач пользователя"""
    tasks = db.query(SqlTask).where(SqlTask.mentee_id == user_id).all()
    return tasks


async def get_tasks_for_mentor(db: Session, mentor_id: int) -> list[TaskDto]:
    """Получение задач подопечных ментора"""
    tasks = db.query(SqlTask).filter(SqlTask.mentor_id == mentor_id).all()
    return tasks
