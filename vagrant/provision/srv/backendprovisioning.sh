
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
    docker load -i ./srv/devops_srv_img.tar
    docker load -i ./filebeat/devops_srv_fb_img.tar

    docker-compose up -d

    
    # docker run -p 3001:3001 -d --name devops_srv devops_server
else
    cd /vagrant
    docker-compose start
    # docker stop devops_srv
    # docker rm devops_srv
    # docker rmi devops_server

    # docker load -i devops_srv_img.tar
    # docker run -p 3001:3001 -d --name devops_srv devops_server
    # docker start devops_srv
fi

