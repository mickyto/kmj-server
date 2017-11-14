import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './src/schema';
import config from './config';

const app  = express();

app.use('/graphql', cors(), graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    pretty: true
})));
app.listen(config.port);
console.log(`Running a GraphQL API server at localhost:${config.port}/graphql`);
