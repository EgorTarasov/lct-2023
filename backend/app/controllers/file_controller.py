import aiofiles
import uuid
import pathlib
import os
import shutil
import typing as tp
import zipfile

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

    async def save_files(self, _zip: bytes, zip_name: str) -> list[SqlFile]:
        tmp_path = "./static/tmp"
        zip_name = zip_name.split(".")[0]
        with open("./static/test.zip", "wb") as f:
            f.write(_zip)

        with zipfile.ZipFile("./static/test.zip", "r") as zip_ref:
            zip_ref.extractall(tmp_path)
            zip_files = [
                tmp_path + "/" + name for name in os.listdir(tmp_path + "/" + zip_name)
            ]

            print(f"files: {zip_files}")

        files = {}
        for file in zip_files:
            static_name = f"./static/{str(uuid.uuid4())}"
            file_name = file.split("/")[-1]
            file_path = f"{tmp_path}/{zip_name}/{file_name}"
            shutil.move(file_path, static_name)

            files[file_name] = static_name

        db_files = crud.file.save_all(self.db, files)
        return db_files

    async def get_file(self, file_id: int) -> SqlFile:
        db_file = crud.file.get(self.db, file_id)
        return db_file
