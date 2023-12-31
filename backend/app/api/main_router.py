from fastapi import APIRouter

from app.api import (
    auth_router,
    task_router,
    event_router,
    user_router,
    mentor_router,
    admin_router,
    course_router,
    quiz_router,
    file_router,
    analytics_router,
    theme_router,
    test_router,
)


router = APIRouter()
router.include_router(test_router.router)
router.include_router(auth_router.router)
router.include_router(user_router.router)
router.include_router(admin_router.router)
router.include_router(mentor_router.router)
router.include_router(quiz_router.router)
router.include_router(task_router.router)
router.include_router(event_router.router)
router.include_router(course_router.router)
router.include_router(file_router.router)
router.include_router(analytics_router.router)
router.include_router(theme_router.router)
