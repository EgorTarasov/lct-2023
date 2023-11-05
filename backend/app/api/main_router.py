from fastapi import APIRouter

from app.api import auth_router, task_router, event_router, \
    role_router, user_router, interest_router, mentor_router, \
    admin_router

router = APIRouter()
router.include_router(auth_router.router)
router.include_router(role_router.router)
router.include_router(user_router.router)
router.include_router(interest_router.router)
router.include_router(mentor_router.router)
router.include_router(admin_router.router)
router.include_router(task_router.router)
router.include_router(event_router.router)