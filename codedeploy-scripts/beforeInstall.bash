if [ -d /home/ubuntu/onlif-landing-tmp ]; then
    rm -rf /home/ubuntu/onlif-landing-tmp
fi

if [ "$DEPLOYMENT_GROUP_NAME" == "code-deploy-group-donation-storage-client" ]; then
  if [ -d /home/ubuntu/donation-storage-client ]; then
      rm -rf /home/ubuntu/donation-storage-client
  fi
  # v: verify - display result message, p: create parent directory
  mkdir -vp /home/ubuntu/donation-storage-client
fi
# if [[ "$(docker ps -f name=bestclass-crm-codedeploy | grep bestclass-crm-codedeploy 2> /dev/null)" != "" ]]; then
#   docker stop bestclass-crm-codedeploy
#   docker rm bestclass-crm-codedeploy
# fi

# 저는 Docker를 이용할 것이기 때문에, 돌가가고 있는 Docker Container를 중지시키고, 제거합니다.
# 이후 afterinstall.bash 파일에서 새롭게 받아온 파일을 사용하여 다시 Docker Container를 띄울 예정입니다.
# [Your Docker Container Name] 예시) woomin-facebook-codedeploy

# if [[ "$(docker images -q bigo777/bestclass-crm:latest 2> /dev/null)" != "" ]]; then
# docker rmi -f $(docker images --format '{{.Repository}}:{{.Tag}}' --filter=reference='bigo777/bestclass-crm:latest')
# fi

# 해당 Docker Image가 존재하면 image를 제거한다는 뜻입니다.
# 이후 afterinstall.bash 파일에서 갱신된 이미지를 불러올 것입니다.
# [Your DockerHub ID]/[Your Repository Name]:[Your version] 예시) dal96k/woomin-facebook:latest