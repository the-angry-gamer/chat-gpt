cd "$(dirname "$0")/..""

docker-compose run --rm web npm install --no-audit
