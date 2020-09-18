docker-compose down -v
docker-compose -f docker-compose.pord.yml up -d --build
# docker-compose -f docker-compose.pord.yml exec web python manage.py migrate --noinput
docker-compose -f docker-compose.pord.yml exec api python manage.py collectstatic --no-input --clear