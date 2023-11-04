from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.auth.security import AuthService

from app.models.role import RoleCreate, RoleDto
from app.core.sql import Sql

from app.controllers.role_controller import RoleController


router = APIRouter(prefix="/roles", tags=["roles"])


@router.post("/", response_model=RoleDto, status_code=status.HTTP_201_CREATED)
async def create_role(
    role_data: RoleCreate,
    db: Session = Depends(Sql.get_session),
):
    # print(user_data)
    role = await RoleController(db).create_role(role_data)
    if not role:
        raise HTTPException(status_code=400, detail="Role already exists")
    return role


@router.get("/", response_model=list[RoleDto], status_code=status.HTTP_200_OK)
async def get_roles(
    db: Session = Depends(Sql.get_session),
):
    try:
        roles = await RoleController(db).get_avaliable_roles()
        return roles
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
