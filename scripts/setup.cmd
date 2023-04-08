REM this will update to the current directory for the project
cd "$(dirname "$0")/..""

REM Install necessary packages
docker-compose run --rm web npm install

REM Update the database by running the most recent migrations
docker-compose run --rm web npm run migration:run
