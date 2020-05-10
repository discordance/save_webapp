# Save Bot WebApp

Here is the main webapp code interacting with the chatbot server.

## Commands

### start

`npm start`

### build 

`npm run build`

## Bot design guidelines

- 1 Never use a dash # in the bot responses 

## Server notes

### bot front

go into `/root/botfront` then
 
`docker-compose up -d`


### send build to server

`scp -r build root@145.14.157.41:/root/app_build`

### https proxy

a docker compose file can be found here: `/root/server_conf/docker-compose.yaml`

`docker-compose up -d`

### certbot

`certbot certonly -d transversal.tech -d bot-admin.transversal.tech -d bot-ws.transversal.tech -d app.transversal.tech`


