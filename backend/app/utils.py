import hashlib
import hmac
import mammoth
import aiofiles
import json
import pydantic.json
from app.models.telegram import TelegramLoginData


async def docx_to_markdown_async(docx_content: bytes):
    """ """
    async with aiofiles.open("tmp.docx", "wb") as file:
        await file.write(docx_content)
    # Convert to Markdown
    with open("tmp.docx", "rb") as file:
        result = mammoth.convert_to_markdown(file)
        markdown = result.value
        messages = result.messages
        print("markdown", markdown)
        return markdown


def _custom_json_serializer(*args, **kwargs) -> str:
    """
    Encodes json in the same way that pydantic does.
    """
    return json.dumps(*args, default=pydantic.json.pydantic_encoder, **kwargs)


def validate(data: TelegramLoginData, secret_key: str) -> bool:
    telegram_data = data.model_dump(
        exclude_unset=True, exclude_none=True, exclude_defaults=True
    )
    data_check_string = "\n".join(
        sorted(
            [
                f"{key}={value or 'null'}"
                for key, value in telegram_data.items()
                if key != "hash" and value is not None
            ]
        )
    )
    secret_key = hashlib.sha256(secret_key.encode()).digest()
    calculated_hash = hmac.new(
        secret_key, msg=data_check_string.encode(), digestmod=hashlib.sha256
    ).hexdigest()

    return data.hash == calculated_hash
