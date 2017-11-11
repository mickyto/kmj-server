import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { nodeField } from './utils/node';
import { QuerySubjects, MutationSubjects } from './types/subjects';
import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, MutationClients, MutationAlterClients, QueryClient } from './types/clients';
import { QueryPupils, MutationPupils, MutationAlterPupils, QueryPupil } from './types/pupils';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        subjects: QuerySubjects,
        users: QueryUsers,
        clients: QueryClients,
        client: QueryClient,
        pupils: QueryPupils,
        pupil: QueryPupil
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin,
        addClient: MutationClients,
        alterClients: MutationAlterClients,
        addSubject: MutationSubjects,
        addPupil: MutationPupils,
        alterPupils: MutationAlterPupils,
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
