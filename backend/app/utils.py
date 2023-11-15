import hashlib
import hmac
import mammoth
import aiofiles
import json
import pydantic.json
import os
import glob
import docx

from app.models.quiz import QuestionCreate, QuizCreate


async def docx_to_markdown_async(docx_content: bytes) -> str:
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


def read_docx(file_path: str) -> str:
    # Загрузка документа
    doc = docx.Document(file_path)
    full_text = []

    # Проход по всем параграфам и добавление их в список
    for para in doc.paragraphs:
        full_text.append(para.text)

    # Соединение списка в одну строку с разделителями
    return "\n".join(full_text)[:1500]


def _custom_json_serializer(*args, **kwargs) -> str:
    """
    Encodes json in the same way that pydantic does.
    """
    return json.dumps(*args, default=pydantic.json.pydantic_encoder, **kwargs)


def check_content_type(content_type: str) -> bool:
    """если zip -> true
    если docx -> false
    остальное exception
    """
    allowed_zip_formats = [
        "application/zip",
        "application/x-zip-compressed",
    ]
    allowed_doc_formats = [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if content_type in allowed_zip_formats:
        return True
    elif content_type in allowed_doc_formats:
        return False


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


def load_questions(_filename: str, file_id: int, folder_path: str = "/proscom"):
    folder_path = os.getcwd() + folder_path
    files = glob.glob(os.path.join(folder_path, "*"))
    file_dict = {}

    for file in files:
        filename, ext = os.path.splitext(os.path.basename(file))

        if ext:
            print(filename, ext)
            if (
                filename.startswith("~$")
                or ext != ".docx"
                or filename.startswith("FAQ")
            ):
                continue
            file_dict[filename + ".docx"] = filename + ".json"
    if _filename not in file_dict.keys():
        return QuizCreate(
            title=_filename, description_text="", file_id=file_id, questions=[]
        )
    quiz = file_dict[_filename]
    with open(f"{folder_path}/{quiz}", "r", encoding="utf-8") as f:
        json_data = json.load(f)
        json_data["file_id"] = file_id
        quiz_data = QuizCreate.model_validate(json_data)

    return quiz_data


if __name__ == "__main__":

    print(load_questions())
