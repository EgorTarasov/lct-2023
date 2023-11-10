import logging

from celery import Celery

from app import crud
from app.config import config
from app.core.sql import Sql
from app.mailing import EmailClient
from app.models.task import TaskStatus

celery = Celery(__name__, broker=config.rabbitmq_url)
# celery.conf.timezone = 'Europe/Moscow'
email_client = EmailClient(
    mail_user=config.mail_user, mail_password=config.mail_password
)


@celery.task
def notify_user_about_registration(fullname: str, email: str, password: str):
    logging.debug("sending email about registration")
    subject = "Регистрация на сервисе для адаптации"
    template = "registration.jinja"

    data = {"fullname": fullname, "password": password}
    email_client.send_mailing(email, subject, template, data)


@celery.task
def notify_user_about_new_task(fullname: str, email: str, task_name: str):
    logging.debug("sending email about new task")
    subject = "Назначена новая задача"
    template = "task_new.jinja"

    data = {"fullname": fullname, "task_name": task_name}
    email_client.send_mailing(email, subject, template, data)


@celery.task
def notify_admin_about_task_done(email: str, mentor_fullname: str, mentee_fullname: str, task_name: str):
    logging.debug("sending email about task_done")
    subject = "Подопечный выполнил задачу!"
    template = "task_done.jinja"

    data = {"mentor_fullname": mentor_fullname, "mentee_fullname": mentee_fullname,
            "task_name": task_name}
    email_client.send_mailing(email, subject, template, data)


@celery.task
def check_for_deadline(task_id: int):
    logging.debug("sending email about deadline soon")
    subject = "Скоро дедлайн по задаче"
    template = "task_deadline.jinja"
    sql = Sql(
        pg_user=config.postgres_user,
        pg_password=config.postgres_password,
        pg_host=config.postgres_host,
        pg_db=config.postgres_db,
        pg_port=config.postgres_port,
    )
    print(task_id)
    session_generator = sql.get_session()
    with next(session_generator) as session:
        task = crud.task.get_task_by_id(session, task_id)
        if task.status == TaskStatus.finished:
            return
        fullname = f"{task.mentee.last_name} {task.mentee.first_name} {task.mentee.middle_name}"
        data = {"fullname": fullname, "task_name": task.name}
        email_client.send_mailing(task.mentee.email, subject, template, data)
