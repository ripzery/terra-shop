# Copy env vars from `.env.client` and `.env.server` to both client and server app.
env:
	cp .env.client client/.env
	cp .env.server server/.env

install-client:
	cd client && npm install

install-server:
	cd server && npm install

start-server-db:
	cd server && docker-compose up -d

stop-server-db:
	cd server && docker-compose down

init-server-db:
	cd server && npm run typeorm migration:run
	cd server && npm run seed:run

start-server-app:
	cd server && npm run start

start-client-app:
	cd client && npm run start