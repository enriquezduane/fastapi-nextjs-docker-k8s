# Load config
include deploy.config

.PHONY: build push deploy ssh

build:
	docker build -t $(DOCKER_USER)/fastapi-backend:$(TAG) ./fastapi-backend
	docker build --build-arg NEXT_PUBLIC_API_URL=$(API_URL) -t $(DOCKER_USER)/next-frontend:$(TAG) ./next-frontend

push:
	docker push $(DOCKER_USER)/fastapi-backend:$(TAG)
	docker push $(DOCKER_USER)/next-frontend:$(TAG)

deploy:
	scp docker-compose.yml .env $(SERVER):$(REMOTE_DIR)/
	ssh $(SERVER) "cd $(REMOTE_DIR) && docker compose pull && docker compose up -d"

ssh:
	ssh $(SERVER)
