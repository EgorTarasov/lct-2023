from datetime import timezone, timedelta, datetime

from sqlalchemy.orm import Session

from app import crud
from app.models.action import ActionCreate, ActionType
from app.models.task import TaskDto, TaskCreate, TaskStatus
from app.worker import (
    notify_user_about_new_task,
    notify_admin_about_task_done,
    check_for_deadline,
)
from telegram.bot import notify, NotificationType


class TaskController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_tasks(self, user_id: int) -> list[TaskDto]:
        user_tasks = await crud.task.get_tasks(self.db, user_id)
        return [TaskDto.model_validate(obj) for obj in user_tasks]

    async def get_task_by_id(self, task_id: int) -> TaskDto:
        task = crud.task.get_task_by_id(self.db, task_id)
        return TaskDto.model_validate(task)

    async def get_tasks_for_mentor(self, mentor_id: int) -> list[TaskDto]:
        mentor_tasks = await crud.task.get_tasks_for_mentor(self.db, mentor_id)
        return [TaskDto.model_validate(obj) for obj in mentor_tasks]

    async def create_task(self, payload: TaskCreate, mentor_id: int) -> TaskDto:
        task = await crud.task.create_task(self.db, payload, mentor_id)

        fullname = f"{task.mentee.last_name} {task.mentee.first_name} {task.mentee.middle_name}"
        if task.mentee.telegram:
            await notify(
                task.mentee.telegram.id,
                NotificationType.task_new,
                {
                    "fullname": f"{task.mentee.first_name} {task.mentee.last_name}",
                    "task_name": task.name,
                },
            )

        notify_user_about_new_task.delay(fullname, task.mentee.email, task.name)
        check_for_deadline.apply_async(
            (task.id,), eta=task.deadline - timedelta(days=1)
        )
        return TaskDto.model_validate(task)

    async def change_task(self, task_id: int, payload: TaskCreate) -> TaskDto:
        task = await crud.task.change_task(self.db, task_id, payload)
        return TaskDto.model_validate(task)

    async def delete_task(self, task_id: int):
        await crud.task.delete_task(self.db, task_id)

    async def update_task_status(self, task_id: int, status: str) -> TaskDto:
        task = crud.task.get_task_by_id(self.db, task_id)
        task.status = status
        if status == TaskStatus.finished:
            mentor_fullname = f"{task.mentor.last_name} {task.mentor.first_name} {task.mentor.middle_name}"
            mentee_fullname = f"{task.mentee.last_name} {task.mentee.first_name} {task.mentee.middle_name}"
            if task.mentor.telegram:
                await notify(
                    task.mentor.telegram.id,
                    NotificationType.task_done,
                    {
                        "mentor_fullname": mentor_fullname,
                        "mentee_fullname": mentee_fullname,
                        "task_name": task.name,
                    },
                )

            notify_admin_about_task_done.delay(
                task.mentor.email, mentor_fullname, mentee_fullname, task.name
            )
        await crud.action.create(
            self.db,
            ActionCreate(action=ActionType.update_task_status, user_id=task.mentee.id),
        )
        return TaskDto.model_validate(task)
