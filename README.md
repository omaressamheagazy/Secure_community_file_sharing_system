
# API forSecure Community File sharing

The Secure Community File Sharing System is an application that enables users to share files securely through end-to-end encryption within a community framework. For a comprehensive understanding of the app, you can access the full documentation at: https://drive.google.com/file/d/1H8qEsQAtfuqOBF3hMBXOL0Jo0jI4gw2M/view?usp=sharing

This repository houses the backend of the Secure Community File Sharing System. It acts as an API, providing all the necessary routes for running the application.

## Stage 2

The following tasks have implemented:

* User autentication (Login and, registration)
* Community creation 
* Sub-community creation 
* File uploading 
* User Request 
* Adding users to communities 

Next Stage:

* Permission system for commmunities, files, and users
* Searching functionality for the communiteis


### Container structures
```bash
├── api
├── db
└── pgadmin

Nginx is also installed in the Dockerfile, serving as the web server for the API
```
## Installation
### backend
Adjust your .env variables in .env.example, and rename the file to .env

```bash

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SPA_URL=http://localhost:5173
SESSION_DOMAIN=localhost

```
To run the containers, please use the provided Makefile. Run make to see all supported commands.

```bash
    Usage:
      make <target>

    Targets:
      help        Print help.
      ps          Show containers.
      build       Build all containers for DEV
      build-prod  Build all containers for PROD
      start       Start all containers
      fresh       Destroy & recreate all uing dev containers.
      fresh-prod  Destroy & recreate all using prod containers.
      stop        Stop all containers
      restart     Restart all containers
      destroy     Destroy all containers
      ssh         SSH into PHP container
      install     Run composer install
      migrate     Run migration files
      migrate-fresh  Clear database and run all migrations
      tests       Run all tests
      tests-html  Run tests and generate coverage. Report found in reports/index.html

To run all containers for local development, run `make fresh`. Otherwise `make fresh-prod` for prod builds.

Default PHP port is configured to 98000. Connect via `http:/localhost:9000` or `http://127.0.0.1:9000`

Default DB port is 5432.
```
#### Development

```bash
make fresh 
```
#### Production

```bash
fresh-prod 
```
### frontend

```bash
cd frontend
```
```bash
npm install 
```

```bash
npm run dev
```

## Author

- [@omaressamheagazy](https://github.com/omaressamheagazy)

