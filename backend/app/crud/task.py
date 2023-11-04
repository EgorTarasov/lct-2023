from sqlalchemy.orm import Session

from app.models.tasks import TaskCreate, SqlTask


async def create_task(db: Session, payload: TaskCreate) -> SqlTask:
    """Создание пользователя"""
    db_task = SqlTask(**payload.model_dump())

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


async def get_tasks(db: Session, user_id: int) -> list[SqlTask]:
    """Получение пользователя по id"""
    tasks = db.query(SqlTask).where(SqlTask.mentee_id == user_id).all()
    return tasks
