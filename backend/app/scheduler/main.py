from typing import Any
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from sqlalchemy.engine import Engine
from datetime import datetime, timedelta
import logging


class Scheduler:
    def __init__(self, engine: Engine) -> None:

        self.scheduler = BackgroundScheduler(timezone="Europe/Moscow")

        # self.store = SQLAlchemyJobStore(engine=engine)
        # self.scheduler.add_jobstore(self.store)

    def __call__(self) -> Any:
        return self.scheduler

    def add_job(self, *args, **kwargs) -> None:
        logging.info(f"Add job {args} {kwargs}")
        self.scheduler.add_job(
            *args,
            **kwargs,
            trigger="date",
            run_date=datetime.now() + timedelta(seconds=5),
            # jobstore=self.store
        )


scheduler: None | Scheduler = None
