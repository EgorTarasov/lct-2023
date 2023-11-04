from fastapi import APIRouter

from app.api import auth_router
from app.api import role_router
from app.api import user_router
from app.api import interest_router
from app.api import mentor_router
from app.api import admin_router


router = APIRouter()
router.include_router(auth_router.router)
router.include_router(role_router.router)
router.include_router(user_router.router)
router.include_router(interest_router.router)
router.include_router(mentor_router.router)
router.include_router(admin_router.router)

