from sqlalchemy.orm import Session
from app.models.theme import SqlTheme, ThemeBase, ThemeDto


async def create(db: Session, theme: ThemeBase) -> ThemeDto:

    db_theme = SqlTheme(
        company_name=theme.company_name,
        company_logo=theme.company_logo,
        main_color=theme.main_color,
    )
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return ThemeDto.model_validate(db_theme)


async def get(db: Session, id: int) -> ThemeDto:
    db_theme = db.query(SqlTheme).filter(SqlTheme.id == id).one_or_none()
    if db_theme:
        return ThemeDto.model_validate(db_theme)
    raise ValueError("Тема не найдена")


async def update(db: Session, theme: ThemeDto) -> ThemeDto:
    db_theme = db.query(SqlTheme).filter(SqlTheme.id == theme.id).one_or_none()
    if not db_theme:
        raise ValueError("Тема не найдена")
    db_theme.company_logo = theme.company_logo
    db_theme.company_name = theme.company_name
    db_theme.main_color = theme.main_color

    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return ThemeDto.model_validate(db_theme)
