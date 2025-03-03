build:
	docker compose build

start:
	docker compose up -d

shell: start
	docker exec -it fastify /bin/zsh

stop:
	docker compose stop

down:
	docker compose down

clean: down
	docker-compose down --rmi all -v --remove-orphans
