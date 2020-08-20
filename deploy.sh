sudo docker kill hello_world_service_api_1
sudo docker kill hello_world_service_web_1
sudo docker kill hello_world_service_db_1
sudo docker-compose build
sudo docker-compose up -d