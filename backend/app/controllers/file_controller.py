import aiofiles
import uuid
import pathlib
import typing as tp

from fastapi import File
from sqlalchemy.orm import Session
from app.models.file import FileBase, FileDto, SqlFile
from app import crud


class FileController:
    def __init__(self, db: Session) -> None:
        self.db = db

    async def save_file(self, file: bytes, filename: str) -> SqlFile:
        _, _type = filename.split(".")
        file_path = "./static/"
        static_name = str(uuid.uuid4()) + _type
        file_path += static_name
        async with aiofiles.open(file_path, "wb") as static:
            await static.write(file)

        db_file = crud.file.save(self.db, filename=filename, path=file_path)
        return db_file

    async def get_file(self, file_id: int) -> SqlFile:
        db_file = crud.file.get(self.db, file_id)
        return db_file
