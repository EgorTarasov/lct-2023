import logging

from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.core.sql import Sql
from app.models.file import SqlFile, FileDto, SqlPositionFile
from app.worker import file_upload, file_get_url

router = APIRouter(prefix="/files", tags=["files"])


@router.post("/upload", response_model=bool)
async def download_file(
    position_id: int = 1,
    file: UploadFile = File(...),
    db: Session = Depends(Sql.get_session),
) -> bool:
    try:
        db_file = SqlFile(filename=file.filename)
        db.add(db_file)
        db.commit()
        db.refresh(db_file)
        db_file_position = SqlPositionFile(position_id=position_id, file_id=db_file.id)
        db.add(db_file_position)
        db.commit()
        db.refresh(db_file_position)
        file_upload(file.file, file.filename)
        return True
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


@router.get("/{file_id}", response_model=FileDto)
async def get_file(
    file_id: int,
    db: Session = Depends(Sql.get_session),
) -> FileDto:
    try:
        file_db = db.query(SqlFile).filter(SqlFile.id == file_id).one_or_none()
        file = FileDto.model_validate(file_db)
        file.url = file_get_url(file.filename)
        return file
    except Exception as e:
        logging.error(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)