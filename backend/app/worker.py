import logging

from celery import Celery
from app.config import config
from app.mailing import EmailClient


celery = Celery(__name__, broker=config.rabbitmq_url)
email_client = EmailClient(
    mail_user=config.mail_user, mail_password=config.mail_password
)


@celery.task
def user_create_notification(fio: str, email: str, password: str):
    logging.debug("sending email")
    subject = "Регистрация на сервисе для адаптации"
    template = "test.jinja"

    data = {"user_name": fio, "new_password": password}
    email_client.send_mailing(email, subject, template, data)
