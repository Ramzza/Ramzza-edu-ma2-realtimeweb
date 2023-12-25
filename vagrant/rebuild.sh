
#!/bin/bash

# docker save -o ../vagrant/provision/db/devops_db_img.tar mongo:latest
cd ../database
# docker rmi devops_database
# docker build -t devops_database .
# docker save -o ../vagrant/provision/db/devops_db_img.tar devops_database:latest

cd db
docker rmi database_mongodb
docker build -t database_mongodb .
cd ../filebeat
docker rmi database_filebeats
docker build -t database_filebeats .
cd ..

docker save -o ../vagrant/provision/db/db/devops_db_img.tar database_mongodb:latest
docker save -o ../vagrant/provision/db/filebeat/devops_db_fb_img.tar database_filebeats:latest

cp docker-compose.yml ../vagrant/provision/db/docker-compose.yml

cd ../backend
# docker-compose down
# docker-compose build
# docker-compose up -d
# docker-compose stop
cd srv
docker rmi backend_server
docker build -t backend_server .
cd ../filebeat
docker rmi backend_filebeats
docker build -t backend_filebeats .
cd ..

docker save -o ../vagrant/provision/srv/srv/devops_srv_img.tar backend_server:latest
docker save -o ../vagrant/provision/srv/filebeat/devops_srv_fb_img.tar backend_filebeats:latest

# docker-compose down

cp docker-compose.yml ../vagrant/provision/srv/docker-compose.yml
# cp docker-compose.yml ../vagrant/provision/srv/docker-compose.yml
# cp docker-compose.yml ../vagrant/provision/srv/docker-compose.yml
# docker rmi devops_server
# docker build -t devops_server .
# docker save -o ../../vagrant/provision/srv/devops_srv_img.tar devops_server:latest


cd ../frontend
docker rmi devops_client
docker build -t devops_client .
docker save -o ../vagrant/provision/cli/devops_cli_img.tar devops_client:latest

# cd ../vagrant
# vagrant up --provision   