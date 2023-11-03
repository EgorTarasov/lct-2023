from fastapi import APIRouter

from app.api import auth

router = APIRouter(prefix="/api")
router.include_router(auth.router)


