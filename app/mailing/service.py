import smtplib
import pathlib
import jinja2
import logging
from email.mime.text import MIMEText
import typing as tp

from app.config import config


class EmailService:
    def __init__(
        self,
        mail_user: str,
        mail_password: str,
        host: str = "smtp.mail.ru",
        port: int = 465,
        templates_path: pathlib.Path | str = pathlib.Path("./templates"),
    ) -> None:
        """EmailClient для отправки писем через smtp сервер

        Реализует возможность email рассылки через smtp сервер

        Для писем используется шаблоны jinja2

        Args:
            mail_user (str): почтовый ящик, с которого будут отправляться письма
            mail_password (str): пароль от почтового ящика
            server_host (str, optional): host для smtp сервера По умолчанию "smtp.mail.ru".
            server_port (int, optional): _description_. По умолчанию 587.
            templates_path (pathlib.Path | str, optional): путь до папки с шаблонами писем. По умолчанию pathlib.Path("./templates").
        """
        self._host = host
        self._port = port
        self.__user = mail_user
        self.__password = mail_password
        self._templates = jinja2.Environment(
            loader=jinja2.FileSystemLoader(templates_path)
        )
        self._server = self._create_connection()
        print(self._server)

    def _create_connection(self) -> smtplib.SMTP_SSL:

        server = smtplib.SMTP_SSL(self._host, self._port)
        try:
            reply = server.login(self.__user, self.__password)
            print(reply)
        except Exception as e:
            logging.error(f"Can't connect to mail server: {e}")
            raise e
        finally:
            logging.info("Connected to mail server")
        return server

    def __new__(cls, *args, **kwargs):
        """Singleton
        гарантируем, что во время исполнения программы может быть создан только один экземпляр класса

        """
        if not hasattr(cls, "instance"):
            cls.instance = super(EmailService, cls).__new__(cls)
        return cls.instance

    # def __del__(self):
    #     self._server.quit()
    async def send_mailing(
        self,
        to: str,
        subject: str,
        template: str,
        data: dict[str, tp.Any],
    ) -> None:
        print("sending")
        """Отправка письма через SMTP

        Args:
            to (str): почтовый адрес получателя
            subject (str): Тема письма
            template (str): Название шаблона
            data (dict[str, Any]): Данные для отрисовки шаблона

        Raises:
            e: Ошибка создание шаблона / соединения с сервером
        """

        try:
            msg = MIMEText(
                self._templates.get_template(f"{template}.html").render(**data),
                "html",
            )
            msg["To"] = to
            msg["Subject"] = subject
            send_errs = self._server.sendmail(self.__user, to, msg.as_string())
            if send_errs:
                logging.error(send_errs)
        except Exception as e:
            print(e)
            logging.error(f"Can't send email: {e}")
            raise e


def get_mail_service() -> EmailService:
    service = EmailService(mail_user=config.mail_user, mail_password=config.mail_password)
    # TODO сделать менеджер контекста
    yield service
