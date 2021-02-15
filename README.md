# Terra Shop

A POC concept to accept terra stablecoins for payment.

# Requirement

- Node `v14.15.4`
- Docker

# Environment variables

Open `.env.server` and edit `<MERCHANT_EMAIL_ADDRESS>` to an email for receiving payment.

Other fields are optional.

# Installation

1. Install dependencies for client

Run `make install-client`

2. Install dependencies for server

Run `make install-server`

3. Make sure you're already edit `.env.server` file. Then, copy envs to both app.

Run `make env`

4. Start postgres in docker

Run `make start-server-db`

5. Initialize schema and seed data

Run `make init-server-db`

# Running

1. Run server app `make start-server-app`

By default, server app will be running at http://localhost:3000

2. Run client app `make start-client-app`

By default, client app will be running at http://localhost:3001
