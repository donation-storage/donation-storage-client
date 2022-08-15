# copy files to target by group name
if [ "$DEPLOYMENT_GROUP_NAME" == "code-deploy-group-donation-storage-client" ]; then
  # Copy to prod
  cp -R /home/ubuntu/donation-storage-tmp/. /home/ubuntu/donation-storage-client
  chown -R ubuntu:ubuntu /home/ubuntu/donation-storage-client
  cd /home/ubuntu/donation-storage-client
  aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin public.ecr.aws/g6t4g5a6/donation-storage-client:client

  # stop container from src directory
  # if [ -d /home/ubuntu/onlif-landing-prod ]; then
  #     cd /home/ubuntu/src
  #     docker-compose -f docker-compose-production.yml down
  #     cd /home/ubuntu/onlif-landing-prod
  # fi

  docker-compose -f docker-compose.yml pull
  docker-compose -f docker-compose.yml up -d
fi

docker system prune --all --force

#docker run --env-file /home/ubuntu/.env --publish 3000:3000 -it --detach --name bestclass-crm-codedeploy bestclass-crm /bin/bash
#docker run --publish 3000:3000 -it --detach --name bestclass-crm-codedeploy 842469060325.dkr.ecr.ap-northeast-2.amazonaws.com/bestclass:latest /bin/bash

# DockerHub에 있는 Image를 pull하여 EC2 instance로 가져옵니다.
# 받아온 Image를 Docker Container에 띄워서 가동시킵니다.

# [Your Docker Image] 예시) dal96k/woomin-facebook:latest
# [Local Port Number]:[Docker port Number] 예시) 7000:7000
# [Your new Docker Container Name] 예시) woomin-facebook-codedeploy

# DockerHub에 있는 Image는 차후 GitHub Action을 사용해서 git push를 할 때마다 새로운 image를 build 하여 갱신시켜줄 것입니다.
# 환경변수는 .gitignore에 등록하여 GitHub에 업로드 되지 않으므로 Docker Container를 가동시킬 때 따로 주입해줍니다.
# 환경변수가 담긴 파일은 별도로 EC2 instance 내에 직접 작성해주셔야 합니다.