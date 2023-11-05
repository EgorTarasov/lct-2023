import smtplib
import pathlib
import jinja2
import logging
from email.mime.text import MIMEText
import typing as tp


class EmailData(tp.TypedDict):
    to: str
    subject: str
    template: str
    data: dict[str, tp.Any]


class EmailClient:
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
        #  self._server = self._create_connection()

    def _create_connection(self) -> smtplib.SMTP_SSL:

        server = smtplib.SMTP_SSL(self._host, self._port)
        try:
            reply = server.login(self.__user, self.__password)
            logging.debug(reply)
        except Exception as e:
            logging.error(f"Can't connect to mail server: {e}")
            raise e
        finally:
            logging.info("Connected to mail server")
        return server

    def send_mailing(
        self,
        to: str,
        subject: str,
        template: str,
        data: dict[str, tp.Any],
    ) -> None:
        server = self._create_connection()
        logging.debug(
            f"sending, to: {to}, subject: {subject}, template: {template}, data: {data}"
        )
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
            send_errs = server.sendmail(self.__user, to, msg.as_string())
            if send_errs:
                logging.error(send_errs)
        except Exception as e:
            logging.error(f"Can't send email: {e}")

            raise e
        server.close()
