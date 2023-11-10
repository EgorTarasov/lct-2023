from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.auth.jwt import UserTokenData
from app.auth.dependency import get_current_user

from app.controllers.file_controller import FileController
from app.core.sql import Sql

router = APIRouter(prefix="/files", tags=["files"])


@router.get("/")
async def download_file(
    file_id: int,
    _: UserTokenData = Depends(get_current_user),
    db: Session = Depends(Sql.get_session),
) -> FileResponse:
    controller = FileController(db)
    file = await controller.get_file(file_id)

    return FileResponse(filename=file.name, path=file.path)
