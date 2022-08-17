#!/bin/bash
# Post build actions
echo '◕ Starting deployment'
ssh ubuntu@ec2-54-196-224-185.compute-1.amazonaws.com "
  docker image prune -f 
  cd app 
  docker-compose down
  docker rmi nvcti/website:latest
  docker-compose up -d
  "
echo "✔️ Done"