# MyFAS-API

API REST for MyFilmsAndMovies project
## Requirements
- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Start project
- choose the environment type in `.env` file
    - add key `ENVIRONMENT=development` or `ENVIRONMENT=production`
- start project, execute shell command `docker-compose up`

## Stop project
- execute shell command `docker-compose down`


## Docker environment
- **Node.js** : 12
    - project path: `./`
- **PostgreSQL**: 12
    - data path: `./pgdata`

## Routes

// USER

add user
remove user
modify user
user information

add media to favorite
get favorite media
delete favorite media
search media
    by genre
    by actor
    by director
    by producer
    by personalities
    by type

search personality

// ADMIN