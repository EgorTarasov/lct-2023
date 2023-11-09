import logging

from celery import Celery
from app.config import config
from app.mailing import EmailClient


celery = Celery(__name__, broker=config.rabbitmq_url)
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
def notify_admin_about_task_done(email: str, mentor_fullname: str, mentee_fullname: str, task_name: str):
    logging.debug("sending email about task_done")
    subject = "Подопечный выполнил задачу!"
    template = "task_done.jinja"

    data = {"mentor_fullname": mentor_fullname, "mentee_fullname": mentee_fullname,
            "task_name": task_name}
    email_client.send_mailing(email, subject, template, data)


