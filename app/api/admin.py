from fastapi import APIRouter, Depends

from app.schemas.user import UserDto, UserCreateDto

# from app.dependencies.role_checker import RoleChecker

# allow_create_resource = RoleChecker(["ADMIN"])
router = APIRouter(prefix="/admin", tags=["admin"])  # dependencies=[Depends(allow_create_resource)]


@router.post("/register", response_model=UserDto)
async def register_new_user(user: UserCreateDto):
    pass
