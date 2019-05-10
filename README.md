# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## Docker & Docker Compose:

1. sudo docker build -t XXXX-backend .
2. sudo docker-compose up -d
3. sudo docker-compose logs
4. sudo docker-compose down

Remove persistent data with "sudo rm -rf pgdata"

Disable Redis and Postgres on localhost:

- sudo service postgresql stop
- sudo service redis stop

Enable Redis and Postgres on localhost:

- sudo service postgresql start
- sudo service redis start
