# Terminal in following path:

<repo_path>/devops_proj/backend

# Build image:

docker build -t devops_server .

# Run container:

docker run -p 3001:3001 -d --name devops_srv devops_server

# Export image

docker save -o ../vagrant/provision/srv/devops_srv_img.tar devops_server:latest

# Import image

docker load -i devops_srv_img.tar
