#!/bin/bash
cd /home/ubuntu/donation-storage-client

export NEXT_PUBLIC_USE_API_MOCKING=$(aws ssm get-parameters --region ap-northeast-2 --names NEXT_PUBLIC_USE_API_MOCKING --query Parameters[0].Value | sed 's/"//g')
export NEXT_PUBLIC_SERVER_API=$(aws ssm get-parameters --region ap-northeast-2 --names NEXT_PUBLIC_SERVER_API --query Parameters[0].Value | sed 's/"//g')
export NEXT_PUBLIC_CLINET_DOMAIN=$(aws ssm get-parameters --region ap-northeast-2 --names NEXT_PUBLIC_CLINET_DOMAIN --query Parameters[0].Value | sed 's/"//g')
export NEXT_PUBLIC_CLINET_ORIGIN=$(aws ssm get-parameters --region ap-northeast-2 --names NEXT_PUBLIC_CLINET_ORIGIN --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start yarn --name "nextjs" -- run serve -- --port=80