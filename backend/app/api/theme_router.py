from fastapi import APIRouter, Depends
from app.models.theme import ThemeBase, ThemeDto
from sqlalchemy.orm import Session

from app import crud
from app.core.sql import Sql


router = APIRouter("/theme", tags=["theme"])


@router.get("/")
async def get_theme(id: int, db: Session = Depends(Sql.get_session)):
    return await crud.theme.get(db, id)


@router.post("/")
async def create_theme(payload: ThemeBase, db: Session = Depends(Sql.get_session)):
    return await crud.theme.create(db, payload)


@router.put("/")
async def update_theme(payload: ThemeDto, db: Session = Depends(Sql.get_session)):
    return await crud.theme.update(db, payload)
