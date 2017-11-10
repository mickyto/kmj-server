import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { nodeField } from './utils/node';
import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, MutationClients, MutationMoveClients } from './types/clients';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        users: QueryUsers,
        clients: QueryClients
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin,
        addClient: MutationClients,
        moveClients: MutationMoveClients

    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
