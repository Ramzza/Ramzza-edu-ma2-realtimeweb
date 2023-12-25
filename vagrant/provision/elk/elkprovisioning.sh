
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

    sudo curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)"  -o /usr/local/bin/docker-compose
    sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
    sudo chmod +x /usr/bin/docker-compose

    cd /vagrant/elk_containers
    docker-compose up -d
else
    cd /vagrant/elk_containers
    docker-compose start
fi

