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


def check_telegram_response(data, bot_token: str):
    d = data.copy()
    del d["hash"]
    d_list = []
    for key in sorted(d.keys()):
        if d[key] is not None:
            d_list.append(key + "=" + str(d[key]))
    data_string = bytes("\n".join(d_list), "utf-8")

    secret_key = hashlib.sha256(bot_token.encode("utf-8")).digest()
    hmac_string = hmac.new(secret_key, data_string, hashlib.sha256).hexdigest()
    if hmac_string == data["hash"]:
        return True
    return False
