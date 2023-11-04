from sqlalchemy.orm import Session

from app import crud
from app.auth.jwt import UserTokenData
from app.models.user import UserDto


class MentorController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_mentees(self, user: UserTokenData) -> list[UserDto]:
        return await crud.user.get_mentee(self.db)

    async def get_assigned_mentees(self, mentor_id: int) -> list[UserDto]:
        return await crud.user.get_assigned_mentees(self.db, mentor_id)

    async def assign_mentee(self, mentor_id: int, mentee_id: int) -> list[UserDto]:
        return await crud.user.assign_mentee(self.db, mentor_id, mentee_id)
