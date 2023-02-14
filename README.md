## FORK Y CLUSTER CON NODE

### node server.js 8080 CLUSTER
### node server.js 8080 CLUSTER

## FORK Y CLUSTER CON PM2

### cd /proyecto
### pm2 start server.js --name='servercluster' --watch -i max -- 8080
### pm2 start server.js --name='serverfork' --watch -- 8080
### pm2 list

# FOREVER

### forever start server.js 8080 CLUSTER
### forever list