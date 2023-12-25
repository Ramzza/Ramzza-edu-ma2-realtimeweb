# edu-ma2-realtimeweb

## Running in dev env:

### Start Database

cd ./database
docker-compose up -d
or
docker-compose -p edu-ma-web-DB up -d

### Start RabbitMQ

docker run -it --rm --name edu-ma-web-rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

### Start Email Worker Server

cd ./backend/worker/server
npm ci (first start)
nodemon app.js

### Start Backend Server

cd ./backend/srv/server
npm ci (first start)
nodemon app.js

### Start Frontend

cd ./frontend/client
npm ci (first start)
nodemon app.js
