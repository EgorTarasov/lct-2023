install:
	pip3 install -r requirements/local.txt

run:
	uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

run-web:
	npm --prefix ../frontend install
	npm --prefix ../frontend run dev

build: 
	docker compose -f ../deployment/local.docker-compose.yaml up  --build -d

down:
	docker compose -f ../deployment/local.docker-compose.yaml down

db:
	docker compose -f ../deployment/local.docker-compose.yaml up db worker rabbitmq --build -d
web: 
	docker compose -f ../deployment/local.docker-compose.yaml up db web  --build -d