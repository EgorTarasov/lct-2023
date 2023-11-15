from openai import OpenAI
from app.config import config
from app.utils import read_docx

openai_client = OpenAI(api_key=config.api_key)
print(config.api_key)
request_cnt = 0


def create_test_openai(prompt_path: str, docx_path: str):
    global request_cnt
    request_cnt += 1
    if request_cnt > 1:
        return {}
    document_text = read_docx(docx_path)
    with open(prompt_path, "r") as file:
        prompt = file.read()
    prompt = prompt + document_text
    messages = [
        {"role": "user", "content": "hello, i am a student"},
        {"role": "user", "content": prompt},
    ]

    result = openai_client.chat.completions.create(
        model="gpt-3.5-turbo", messages=messages
    )

    return result


if __name__ == "__main__":
    print(create_test_openai("./proscom/prompt.txt", "./proscom/check-points.docx"))


# from openai import OpenAI
# from app.config import config


# response = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": "Who won the world series in 2020?"},
#         {
#             "role": "assistant",
#             "content": "The Los Angeles Dodgers won the World Series in 2020.",
#         },
#         {"role": "user", "content": "Where was it played?"},
#     ],
# )
