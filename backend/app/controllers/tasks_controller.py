from sqlalchemy.orm import Session

from app import crud
from app.auth.jwt import UserTokenData
from app.models.tasks import TaskDto, TaskCreate
from app.models.user import UserDto


class TaskController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_tasks(self, user_id: int) -> list[TaskDto]:
        return await crud.task.get_tasks(self.db, user_id)

    async def create_task(self, payload: TaskCreate) -> TaskDto | None:
        try:
            return await crud.task.create_task(self.db, payload)
        except Exception as e:
            raise e
