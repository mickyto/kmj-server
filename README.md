KMJ-server
==============

GraphQL server for KMJ UI. This server was created to response to [KMJ project](https://github.com/mickyto/kazakovmj) 



## Set up MongoDB
```bash
    docker run -d --name mongo -i -t mongo

    # Provision database [ if needed ]
    docker cp mongodb.users.json mongo:/
    docker exec -i -t mongo mongoimport --db kmj --collection users mongodb.users.json --jsonArray
```

## Build and run locally
```bash
    docker run -d -v $PWD:/usr/src/app/ -w /usr/src/app/ --link mongo -p 8080:8080 --name kmj node:8.7.0 npm start
```

