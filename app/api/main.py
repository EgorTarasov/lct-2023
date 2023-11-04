from fastapi import APIRouter

from app.api import auth, admin
from app.api import role

router = APIRouter()
router.include_router(auth.router)
router.include_router(role.router)
router.include_router(admin.router)
