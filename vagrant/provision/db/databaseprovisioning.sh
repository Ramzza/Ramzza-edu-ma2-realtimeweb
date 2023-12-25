
#!/bin/bash

if ! command -v docker &> /dev/null
then
    sudo apt-get update 

    sudo apt-get install apt-transport-https ca-certificates curl software-properties-common gnupg2 -y
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update -y
    sudo apt-get install docker-ce -y
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker vagrant
    sudo apt -y install docker-compose


    cd /vagrant
    docker load -i ./db/devops_db_img.tar
    docker load -i ./filebeat/devops_db_fb_img.tar

    docker-compose up -d

    # cd /vagrant
    # docker load -i devops_db_img.tar
    # docker run -p 3002:27017 -d --name devops_db devops_database
else
    cd /vagrant
    docker-compose start
    # docker stop devops_db
    # docker rm devops_db
    # docker rmi devops_database

    # docker load -i devops_db_img.tar
    # docker run -p 3002:27017 -d --name devops_db devops_database
    # docker start devops_db
fi

