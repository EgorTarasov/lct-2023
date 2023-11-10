import typing as tp
from sqlalchemy.orm import Session

from app import crud
from app.models.action import ActionDto


class AnalyticController:
    def __init__(self, db: Session):
        self.db = db

    async def get_actions(self) -> list[ActionDto]:
        actions = await crud.action.get_all(self.db)
        return [ActionDto.model_validate(action) for action in actions]

    async def get_actions_by_user_id(self, user_id: int) -> list[ActionDto]:
        actions = await crud.action.get_actions_by_user_id(self.db, user_id)
        return [ActionDto.model_validate(action) for action in actions]

    async def create(self, payload: ActionDto):
        await crud.action.create(self.db, payload)


