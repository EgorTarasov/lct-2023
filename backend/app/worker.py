import logging

from botocore.exceptions import ClientError
from typing import BinaryIO

import boto3
from celery import Celery
from app.config import config
from app.mailing import EmailClient

celery = Celery(__name__, broker=config.rabbitmq_url)
email_client = EmailClient(
    mail_user=config.mail_user, mail_password=config.mail_password
)
s3_session = boto3.session.Session()
s3 = s3_session.client(
    service_name="s3",
    endpoint_url="http://localhost:9000",
    aws_access_key_id="QMmDKgOycRAGM6whjtR5",
    aws_secret_access_key="Bqj7qIXUnHrCTqTp4d8eYPFVdY6NZ0orKNNMAfLI"
)


@celery.task
def user_create_notification(fio: str, email: str, password: str):
    logging.debug("sending email")
    subject = "Регистрация на сервисе для адаптации"
    template = "test.jinja"

    data = {"user_name": fio, "new_password": password}
    email_client.send_mailing(email, subject, template, data)


@celery.task
def file_upload(file: BinaryIO, filename: str, bucket: str = "test"):
    logging.debug("saving file")
    s3.upload_fileobj(file, bucket, filename)
    # url = get_url_to_file(filename, bucket)
    # return url


def file_get_url(filename: str, bucket: str = "test") -> str:
    url = s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": bucket, "Key": filename},
        ExpiresIn=3600
    )
    return url

