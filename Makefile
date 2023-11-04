install:
	pip3 install -r requirements/local.txt

run:
	uvicorm app.main:app --host 0.0.0.0 --port 8000 --reload

build_local:
	docker compose -f deployment/local.docker-compose.yaml up --build -d

build:
	docker compose -f deployment/prod.docker-compose.yaml up --build -d
