from sqlalchemy.orm import Session

from app import crud
from app.auth.jwt import UserTokenData
from app.models.task import TaskDto, TaskCreate
from app.models.user import UserDto


class TaskController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_tasks(self, user_id: int) -> list[TaskDto]:
        user_tasks = await crud.task.get_tasks(self.db, user_id)
        return [TaskDto.model_validate(obj) for obj in user_tasks]

    async def get_tasks_for_mentor(self, mentor_id: int) -> list[TaskDto]:
        mentor_tasks = await crud.task.get_tasks_for_mentor(self.db, mentor_id)
        return [TaskDto.model_validate(obj) for obj in mentor_tasks]

    async def create_task(self, payload: TaskCreate, mentor_id: int) -> TaskDto:
        new_task = await crud.task.create_task(self.db, payload, mentor_id)
        return TaskDto.model_validate(new_task)

    async def change_task(self, task_id: int, payload: TaskCreate) -> TaskDto:
        db_event = await crud.task.change_task(self.db, task_id, payload)
        return TaskDto.model_validate(db_event)

    async def delete_task(self, task_id: int):
        await crud.task.delete_task(self.db, task_id)

