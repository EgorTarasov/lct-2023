from sqlalchemy.orm import Session


from app import crud
from app.auth.jwt import UserTokenData
from app.models.interest import InterestUpdate, InterestDto


class InterestController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def update_interest(
        self, user: UserTokenData, payload: InterestUpdate
    ) -> list[InterestDto]:
        return await crud.interest.update_user_interests(
            self.db, user.user_id, payload.interests_ids
        )

    async def get_users_interests(self, user: UserTokenData) -> list[InterestDto]:
        return await crud.interest.get_user_interests(self.db, user.user_id)

    async def get_avaliable_interest(self) -> list[InterestDto]:
        return await crud.interest.get_avaliable_interests(self.db)
