cd /home/ubuntu/donation-storage-client

docker-compose -f docker-compose.yml pull
docker-compose -f docker-compose.yml up -d

docker system prune --all --force