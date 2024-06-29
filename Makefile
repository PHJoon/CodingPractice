image = testnode:test

all: up

up: build
	docker compose -f ./docker-compose.yaml up -d

build:
	docker compose -f ./docker-compose.yaml build

down:
	docker compose -f ./docker-compose.yaml down

downV:
	docker compose -f ./docker-compose.yaml down -v

imgClean:
	docker rmi testnode:test

clean: downV imgClean

fclean:
	yes | docker image prune
	yes | docker volume prune
	yes | docker network prune
	yes | docker system prune

.PHONY: up build down downV imgClean fclean