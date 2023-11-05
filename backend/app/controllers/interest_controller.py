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
        return [
            InterestDto.model_validate(obj)
            for obj in await crud.interest.update_user_interests(
                self.db, user.user_id, payload.interests_ids
            )
        ]

    async def get_users_interests(self, user: UserTokenData) -> list[InterestDto]:
        user_interests = await crud.interest.get_user_interests(self.db, user.user_id)
        return [InterestDto.model_validate(obj) for obj in user_interests]

    async def get_avaliable_interest(self) -> list[InterestDto]:
        avaliable_interests = await crud.interest.get_avaliable_interests(self.db)
        return [InterestDto.model_validate(obj) for obj in avaliable_interests]
