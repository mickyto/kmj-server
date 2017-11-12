import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';
import { nodeField } from './utils/node';
import { QuerySubjects, MutationSubjects, MutationRemoveSubject } from './types/subjects';
import { QueryGroups, MutationGroups, MutationRemoveGroup } from './types/groups';
import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, MutationClients, MutationAlterClients, QueryClient } from './types/clients';
import { QueryPupils, MutationPupils, MutationAlterPupils, QueryPupil } from './types/pupils';
import { QueryTeachers, MutationTeachers, QueryTeacher } from './types/teachers';



const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        subjects: QuerySubjects,
        users: QueryUsers,
        clients: QueryClients,
        client: QueryClient,
        pupils: QueryPupils,
        pupil: QueryPupil,
        teachers: QueryTeachers,
        teacher: QueryTeacher,
        groups: QueryGroups,

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
        addTeacher: MutationTeachers,
        addGroup: MutationGroups,
        removeGroup: MutationRemoveGroup,
        removeSubject: MutationRemoveSubject
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
