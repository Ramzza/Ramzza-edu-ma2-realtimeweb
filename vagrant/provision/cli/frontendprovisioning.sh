
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

    cd /vagrant
    docker load -i devops_cli_img.tar
    docker run -p 3000:3000 -d --name devops_cli devops_client
else
    cd /vagrant
    # docker stop devops_cli
    # docker rm devops_cli
    # docker rmi devops_client

    # docker load -i devops_cli_img.tar
    # docker run -p 3000:3000 -d --name devops_cli devops_client
    docker start devops_cli
fi

