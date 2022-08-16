cd /home/ubuntu/donation-storage-client

docker kill $(docker ps -q)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images)