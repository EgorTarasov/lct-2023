from ast import Call
import asyncio
import logging
import sys
from os import getenv
from time import process_time_ns

from aiogram import Bot, Dispatcher, Router, types
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext
from aiogram.enums.parse_mode import ParseMode
from aiogram import F
from aiogram.filters import CommandStart
from aiogram.filters.callback_data import CallbackData
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    KeyboardButton,
)
from aiogram.utils.markdown import hbold

from app.config import config
from app import crud
from app.core.sql import Sql
from app.models.telegram import TelegramLoginData
from asgiref.sync import async_to_sync
from enum import Enum


dp = Dispatcher()
bot = Bot(config.telegram_bot_token, parse_mode=ParseMode.HTML)
sql = Sql(
    pg_user=config.postgres_user,
    pg_password=config.postgres_password,
    pg_host=config.postgres_host,
    pg_db=config.postgres_db,
    pg_port=config.postgres_port,
)


def get_link(token: str) -> str:
    return f"https://t.me/{config.telegram_bot_name}?start={token}"


class NotificationType(Enum):
    task_new = "task_new"
    task_done = "task_done"
    task_deadline = "task_deadline"


class FeedbackRequest(Enum):
    first = "first"
    week = "week"
    month = "month"


class Messages:
    @staticmethod
    def task_new(fullname: str, task_name: str):
        return f"""
Добрый день, {fullname},

Вам поручена новая задача под названием {task_name}. Мы уверены, что вы справитесь с ней на высшем уровне. Помните, что соблюдение сроков является важным аспектом успешной работы. В случае возникновения вопросов, не стесняйтесь обращаться к вашему руководителю за разъяснениями.

Желаем успеха в выполнении задачи!

С уважением,
Ваш корпоративный сервис.
"""

    @staticmethod
    def task_deadline(fullname: str, task_name: str):
        return f"""
{fullname}! Важное напоминание о дедлайне!

Дедлайн по вашей задаче "{task_name}" наступает очень скоро. Не забудьте завершить её вовремя, чтобы получить дополнительные баллы и улучшить вашу профессиональную репутацию!

Мы уверены в вашей ответственности и желаем успехов!
"""

    @staticmethod
    def task_done(
        mentor_fullname: str,
        mentee_fullname: str,
        task_name: str,
    ):
        return f""" 
Уважаемый(ая) {mentor_fullname},

Хотим сообщить вам, что {mentee_fullname} отлично справился(лась) с заданием {task_name}. Мы предлагаем вам ознакомиться с результатами его(её) работы, дать ценную обратную связь, и, при необходимости, выделить удачные моменты и обозначить аспекты для дальнейшего улучшения.

С благодарностью,
Ваш корпоративный сервис.
"""

    @staticmethod
    def feedback_first_day(fullname: str):
        return f"""Добрый день, {fullname},
🌟 Первый день – это всегда волнительно! Как ощущения? Нужна ли тебе помощь или есть вопросы по работе?

Жду твоих впечатлений и готов помочь с чем угодно!
"""

    @staticmethod
    def feedback_first_week(fullname: str):
        return f"""
Здравствуйте, {fullname},

🚀 Уже неделя работы за плечами! Как твои впечатления? Может, есть идеи или предложения, которыми хочешь поделиться?

Твоё мнение очень важно для нас. Давай работать вместе на улучшение процессов!

"""

    @staticmethod
    def feedback_first_month(fullname: str):
        return f"""
Приветствуем вас, {fullname},

🌟 Первый месяц в команде – это большое достижение! Какие моменты были особенно запоминающимися? Что бы ты хотел(а) изменить или улучшить?

Твои отзывы помогают нам расти и развиваться. Жду твоих идей и предложений!


С уважением,
Борис, твой умный помощник.
"""


class FeedbackCallbackData(CallbackData, prefix="adm"):
    type: FeedbackRequest
    user_id: int


async def notify(tg_id: int, notification: NotificationType, data: dict):
    message = ""
    match notification:
        case NotificationType.task_done:
            message = Messages.task_done(
                data["mentor_fullname"],
                data["mentee_fullname"],
                data["task_name"],
            )
        case NotificationType.task_deadline:
            message = Messages.task_deadline(data["fullname"], data["task_name"])
        case NotificationType.task_new:
            message = Messages.task_new(data["fullname"], data["task_name"])
    await bot.send_message(tg_id, message)


async def request_feedback(tg_id: int, fullname: str, feedback: FeedbackRequest):

    message = ""
    match feedback:
        case FeedbackRequest.first:
            message = Messages.feedback_first_day(fullname)
        case FeedbackRequest.week:
            message = Messages.feedback_first_week(fullname)
        case FeedbackRequest.month:
            message = Messages.feedback_first_month(fullname)
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Пройти опрос",
                    callback_data=FeedbackCallbackData(
                        type=feedback, user_id=tg_id
                    ).pack(),
                )
            ]
        ]
    )
    await bot.send_message(
        tg_id,
        message,
        reply_markup=keyboard,
    )


@dp.message(CommandStart())
async def command_start_handler(message: Message, command: CommandStart) -> None:
    """
    This handler receives messages with `/start` command
    """
    args = command.args
    print(type(args))
    if args:
        with next(sql.get_session()) as db:
            user_id = int(args)
            db_user = await crud.user.get_user_by_id(db, user_id)
            print(message.from_user)
            await crud.telegram.add_account(
                db,
                TelegramLoginData.model_validate(message.from_user.model_dump()),
                db_user.id,
            )
            await message.answer(
                f"Привет, {hbold(db_user.first_name)} {hbold(db_user.last_name)}!"
            )
    else:
        await message.answer("Что-то пошло не так")


class Survey(StatesGroup):
    rating = State()
    feeling = State()
    info = State()


class SurveyResult(CallbackData, prefix="survey_"):
    rating: int = 0
    feeling: int = 0
    info: str = ""


rating_options_sentence = {
    "Процесс был запутанным и неэффективным.": 1,
    "Были некоторые полезные моменты, но в целом процесс требует улучшений.": 2,
    "Процесс был организован неплохо, но есть пространство для улучшений.": 3,
    "Процесс был организован неплохо, но есть пространство для улучшений.": 4,
    "Процесс был понятным и полезным, но имеются небольшие недочёты.": 5,
}

rating_options = {
    "Неудовлетворительно": 1,
    "Удовлетворительно": 2,
    "Хорошо": 3,
    "Очень хорошо": 4,
    "Отлично": 5,
}

feeling_options = {
    "Воодушевленный": 5,
    "Удовлетворенный": 4,
    "Нейтральный": 3,
    "Смущенный": 2,
    "Перегруженный информацией": 1,
}


@dp.callback_query(FeedbackCallbackData.filter(F.type == FeedbackRequest.first))
async def process_first_day(
    query: CallbackQuery, callback_data: FeedbackCallbackData, state: FSMContext
):
    _keyboard = [[KeyboardButton(text=k)] for k, _ in rating_options.items()]
    await state.set_state(Survey.rating)
    await bot.send_message(
        query.from_user.id,
        "Как бы вы оценили процесс онбординга в нашей компании?",
        reply_markup=ReplyKeyboardMarkup(keyboard=_keyboard),
    )


@dp.message(Survey.rating)
async def process_rating(message: Message, state: FSMContext) -> None:
    if message.text not in rating_options.keys():
        await message.reply("Пожалуйста выбери один из предложенных вариантов")
    else:
        _keyboard = [[KeyboardButton(text=k)] for k, _ in feeling_options.items()]
        await state.set_data(data={"rating": rating_options[message.text]})
        await state.set_state(Survey.feeling)
        await message.reply(
            text="Каково ваше эмоциональное состояние после прохождения процесса онбординга?",
            reply_markup=ReplyKeyboardMarkup(
                keyboard=_keyboard,
            ),
        )


@dp.message(Survey.feeling)
async def process_feeling(message: Message, state: FSMContext) -> None:
    if message.text not in feeling_options.keys():
        await message.reply("Пожалуйста выбери один из предложенных вариантов")
    else:
        data = await state.get_data()
        data["feeling"] = feeling_options[message.text]
        await state.set_data(data)
        await state.set_state(Survey.info)
        await bot.send_message(
            message.from_user.id,
            "Была ли предоставленная в процессе онбординга информация достаточной и полезной для вашего успешного старта в компании?",
            reply_markup=ReplyKeyboardRemove(),
        )


@dp.message(Survey.info)
async def process_feeling(message: Message, state: FSMContext) -> None:
    data = await state.get_data()
    data["info"] = message.text
    print(data)
    await message.reply(
        text="""
🎉 Спасибо большое за уделенное время и предоставленную обратную связь. Твоё мнение очень важно для нас, и оно помогает делать нашу компанию еще лучше!

Мы обязательно учтем твои замечания и предложения. Помни, что ты всегда можешь обратиться ко мне за помощью или дополнительной информацией.

Желаю тебе успешного дня и вдохновения в работе!"""
    )


@dp.message()
async def echo_handler(message: types.Message) -> None:
    """
    Handler will forward receive a message back to the sender

    By default, message handler will handle all message types (like a text, photo, sticker etc.)
    """
    try:
        # Send a copy of the received message
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        # But not all the types is supported to be copied so need to handle it
        await message.answer("Nice try!")


async def main() -> None:
    await request_feedback(499114263, "Максим Ледаков", FeedbackRequest.first)
    await dp.start_polling(bot)
