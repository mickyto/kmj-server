import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { nodeField } from './utils/node';
import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients } from './types/clients';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        users: QueryUsers,
        clients: QueryClients
    }
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
