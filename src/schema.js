import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { nodeField } from './utils/node';
import { QuerySubjects, MutationSubjects } from './types/subjects';
import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, MutationClients, MutationAlterClients, QueryClient } from './types/clients';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        subjects: QuerySubjects,
        users: QueryUsers,
        clients: QueryClients,
        client: QueryClient
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin,
        addClient: MutationClients,
        alterClients: MutationAlterClients,
        addSubject: MutationSubjects,
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
