from sqlalchemy.orm import Session

from app import crud
from app.auth.jwt import UserTokenData
from app.models.user import UserDto


class MentorController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_mentees(self, user: UserTokenData) -> list[UserDto]:
        mentees = await crud.user.get_mentee(self.db)
        return [UserDto.model_validate(obj) for obj in mentees]

    async def get_assigned_mentees(self, mentor_id: int) -> list[UserDto]:
        assigned_mentees = await crud.user.get_assigned_mentees(self.db, mentor_id)

        return [UserDto.model_validate(obj) for obj in assigned_mentees]

    async def assign_mentee(self, mentor_id: int, mentee_id: int) -> list[UserDto]:
        assigned_mentees = await crud.user.assign_mentee(self.db, mentor_id, mentee_id)
        return [UserDto.model_validate(obj) for obj in assigned_mentees]
