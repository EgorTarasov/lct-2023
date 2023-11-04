FROM python:3.11.5-bullseye

WORKDIR /code

COPY requirements/prod.txt requirements/prod.txt
COPY requirements/base.txt requirements/base.txt

RUN pip3 install -r requirements/prod.txt

COPY . /code

RUN mkdir -p /data/logs

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]