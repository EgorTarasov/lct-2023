install:
	pip3 install -r requirements/local.txt

build_local:
	docker compose -f deployment/local.docker-compose.yaml up --build -d

build:
	docker compose -f deployment/prod.docker-compose.yaml up --build -d
