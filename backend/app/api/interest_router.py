import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.models.interest import InterestDto
from app.controllers.interest_controller import InterestController
from app.core.sql import Sql

router = APIRouter(prefix="/interest", tags=["interest"])


@router.get("/", response_model=list[InterestDto])
async def get_avaliable_interests(
    db: Session = Depends(Sql.get_session),
):
    """Интересы / хобби доступные для выбора


    Raises:
        HTTPException: не повезло, надо было на го писать
    """
    try:
        return await InterestController(db).get_avaliable_interest()
    except Exception as e:
        # TODO: error messages
        logging.error(e)
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
