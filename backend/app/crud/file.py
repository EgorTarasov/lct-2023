from sqlalchemy.orm import Session
from app.models.file import SqlFile


def save(db: Session, filename: str, path: str, duration: int = 0) -> SqlFile:
    db_file = SqlFile(name=filename, path=path, duration=duration)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


def save_all(db: Session, files: dict[str, str]) -> list[SqlFile]:
    print(files)
    db_files = [SqlFile(name=k, path=v) for k, v in files.items()]
    db.add_all(db_files)
    db.commit()
    for f in db_files:
        db.refresh(f)
    return db_files


def get(db: Session, id: int) -> SqlFile:
    result = db.query(SqlFile).filter(SqlFile.id == id).first()
    if not result:
        raise Exception("File not found")
    return result
