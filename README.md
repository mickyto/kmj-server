KMJ-server
==============

GraphQL server for KMJ UI. This server was created to response to [KMJ project](https://github.com/mickyto/kazakovmj) 



## Set up MongoDB
```bash
    docker run -d --name mongo -i -t mongo
```

## Build and run locally
```bash
    docker run -d -p 8080:3000 -v $PWD:/usr/src/app/ -w /usr/src/app/ --link mongo --name kmj node:8.7.0 npm start
```
