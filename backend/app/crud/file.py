from sqlalchemy.orm import Session
from app.models.file import SqlFile


def save(db: Session, filename: str, path: str) -> SqlFile:
    db_file = SqlFile(name=filename, path=path)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


def get(db: Session, id: int) -> SqlFile:
    result = db.query(SqlFile).filter(SqlFile.id == id).first()
    if not result:
        raise Exception("File not found")
    return result
