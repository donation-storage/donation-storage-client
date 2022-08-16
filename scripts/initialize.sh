cd /home/ubuntu/donation-storage-client

docker kill $(docker ps -q)
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images)

docker system prune --all --force

docker pull public.ecr.aws/g6t4g5a6/donation-storage-client:client