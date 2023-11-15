from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.auth.dependency import get_current_user

from app.auth.jwt import UserTokenData
from app.controllers.file_controller import FileController
from app.models.file import FileDto
from app.core.sql import Sql
from app.core.gpt import create_test

router = APIRouter(prefix="/test")


@router.post("/file")
async def upload_file(
    db: Session = Depends(Sql.get_session),
    data: UploadFile = File(None),
    user: UserTokenData = Depends(get_current_user),
):
    controller = FileController(db)
    print(data.filename)
    if data:

        files = await controller.save_files(data.file.read(), data.filename)
        return [FileDto.model_validate(file) for file in files]
    else:
        return {"Filename": None}


@router.get("/test")
async def test():
    data = create_test(
        prompt_path="./proscom/prompt.txt",
        docx_path="./proscom/Welcome to the Proscom.docx",
    )
    return data
