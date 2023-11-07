install:
	pip3 install -r backend/requirements/local.txt

run:
	uvicorn app.main:app --host localhost --port 8000 --reload

build_local:
	docker compose -f ../deployment/local.docker-compose.yaml up --build -d

build:
	docker compose -f ../deployment/prod.docker-compose.yaml up --build -d

db:
	docker compose -f ../deployment/local.docker-compose.yaml up db --build -d

s3:
	docker compose -f ../deployment/local.docker-compose.yaml up minio --build -d
    uvicorn app.main:app --host localhost --port 8000 --reload