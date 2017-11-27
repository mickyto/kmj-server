KMJ-server
==============

GraphQL server for KMJ UI. This server was created to response to [KMJ project](https://github.com/mickyto/kazakovmj) 
# Instalation

### Set up Mysql
```bash
    docker run -d -e MYSQL_ALLOW_EMPTY_PASSWORD=yes --name mysql -i -t mysql:8.0.3

    # Create new database [ if needed ]
    docker exec -i -t mysql mysql -uroot -e "CREATE DATABASE kmj CHARACTER SET utf8 COLLATE utf8_general_ci;"

    # Provision database [ if needed ]
    docker cp mysql.sample.db.sql mysql:/
    docker exec -i mysql mysql -u root kmj < mysql.sample.db.sql
```

### Set up PhpMyAdmin
```bash
    docker run --name myadmin -d --link mysql:db -p 4000:80 phpmyadmin/phpmyadmin
```

### Set up MongoDB
```bash
    docker run -d --name mongo -i -t mongo

    # Provision database [ if needed ]
    docker cp mongodb.users.json mongo:/
    docker exec -i -t mongo mongoimport --db kmj --collection users mongodb.users.json --jsonArray
```

### Build and run locally
```bash
    docker run --rm -v "$PWD":/usr/src/app/ -w /usr/src/app/ node:8.7.0 npm install
    docker run -d -v $PWD:/usr/src/app/ -w /usr/src/app/ --link mongo -p 8080:8080 --name kmj node:8.7.0 npm start
```

# Deploy
### Hard deploy
Will remove container if exists, install dependencies and run new container
```bash
    docker run -t --rm -v $PWD/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy build
```

### Soft deploy
Will only restart container
```bash
     docker run -t --rm -v $PWD/shipitfile.js:/usr/src/app/shipitfile.js -v ~/.ssh:/root/.ssh mickyto/shipit shipit staging deploy restart
```