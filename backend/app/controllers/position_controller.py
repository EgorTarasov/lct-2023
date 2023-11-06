from sqlalchemy.orm import Session
from app.models.position import PositionDto, SqlPosition, PositionCreate
from app import crud


class PositionController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def create(self, position: PositionCreate) -> PositionDto:
        db_position = await crud.position.create(self.db, position)
        return PositionDto.model_validate(db_position)

    async def get_positions(self) -> list[PositionDto]:
        db_positions = await crud.position.get_all(self.db)
        return [PositionDto.model_validate(db_position) for db_position in db_positions]
