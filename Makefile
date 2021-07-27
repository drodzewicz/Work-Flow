PROJECT = "Work-Flow"

install:_server ;@echo "${PROJECT} Server Install....."; \
	cd server && npm install

install_client: ;@echo "${PROJECT} Client Install....."; \
	cd client && npm install

install: ;@echo "${PROJECT} APP install....."; \
	cd server && npm install
	cd client && npm install

update: ;@echo "Updating ${PROJECT}....."; \
	git pull --rebase; \
	cd server && npm install
	cd client && npm install

clean: ;@echo "cleaning up....."; \
	cd server && rm -rf node_modules
	cd client && rm -rf node_modules

run: ;@echo "${PROJECT} Running Production....."; \
	cd server && npm run start

run_server: ;@echo "${PROJECT} Running Server....."; \
	cd server && npm run dev

run_client: ;@echo "${PROJECT} Running Client....."; \
	cd client && npm run start

build: ;@echo "Building ${PROJECT}....."; \
	cd client && npm run build

env_template: ;@echo ".ENV ${PROJECT}....."; \
	cd server && cp .env.example .env
	cd client && cp .env.example .env

deploy_heroku: ;@echo "Deploying ${PROJECT}....."; \
	git subtree push --prefix server heroku master