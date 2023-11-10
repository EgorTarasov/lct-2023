from sqlalchemy.orm import Session

from app.models.task import TaskCreate, SqlTask


def get_task_by_id(db: Session, task_id: int) -> SqlTask:
    """Получение задачи пользователя"""
    task = db.query(SqlTask).where(SqlTask.id == task_id).one()
    return task


async def get_tasks(db: Session, user_id: int) -> list[SqlTask]:
    """Получение задач пользователя"""
    tasks = db.query(SqlTask).where(SqlTask.mentee_id == user_id).all()
    return tasks


async def get_tasks_for_mentor(db: Session, mentor_id: int) -> list[SqlTask]:
    """Получение задач подопечных ментора"""
    tasks = db.query(SqlTask).filter(SqlTask.mentor_id == mentor_id).all()
    return tasks


async def create_task(db: Session, payload: TaskCreate, mentor_id) -> SqlTask:
    """Создание задачи"""
    db_task = SqlTask(**payload.model_dump(), mentor_id=mentor_id)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


async def change_task(db: Session, task_id: int, payload: TaskCreate) -> SqlTask:
    """Изменение задачи по id"""
    db_task = db.query(SqlTask).where(SqlTask.id == task_id).one_or_none()
    if not db_task:
        raise Exception("Такой задачи не существует")
    for key, value in payload.model_dump().items():
        setattr(db_task, key, value) if value else None
    db.commit()
    db.refresh(db_task)
    return db_task


async def delete_task(db: Session, task_id: int):
    """Удаление задачи по id"""
    deleted_rows = db.query(SqlTask).where(SqlTask.id == task_id).delete()
    if deleted_rows == 0:
        raise Exception("Такой задачи не существует")
    db.commit()
