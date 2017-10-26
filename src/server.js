import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import cors from 'cors';

const app  = express();

app.use('*', cors(), graphqlHTTP({
    schema,
    graphiql: true,
    pretty:true
}));
app.listen(process.env.PORT);
console.log(`Running a GraphQL API server at localhost:${process.env.PORT}/graphql`);
