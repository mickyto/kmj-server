import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, QueryClient, MutationAddOrEditClient, MutationMoveClient } from './types/clients';
import { QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil } from './types/pupils';
import { QueryGroups, MutationGroups, MutationRemoveGroup } from './types/groups';
import { QueryTeachers, MutationTeachers, QueryTeacher } from './types/teachers';
import { QueryFormats, MutationAddOrEditFormat, MutationRemoveFormat } from './types/formats';
import { QuerySubjects, MutationAddOrEditSubject, MutationRemoveSubject } from './types/subjects';
import { QueryChannels, MutationAddOrEditChannel, MutationRemoveChannel } from './types/channels';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: QueryUsers,
        clients: QueryClients,
        client: QueryClient,
        pupils: QueryPupils,
        pupil: QueryPupil,
        groups: QueryGroups,
        teachers: QueryTeachers,
        teacher: QueryTeacher,
        formats: QueryFormats,
        subjects: QuerySubjects,
        channels: QueryChannels,
    }
});

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin,
        addOrEditClient: MutationAddOrEditClient,
        moveClient: MutationMoveClient,
        addOrEditPupil: MutationAddOrEditPupil,
        movePupil: MutationMovePupil,
        addGroup: MutationGroups,
        removeGroup: MutationRemoveGroup,
        addTeacher: MutationTeachers,
        addOrEditFormat: MutationAddOrEditFormat,
        removeFormat: MutationRemoveFormat,
        addOrEditSubject: MutationAddOrEditSubject,
        removeSubject: MutationRemoveSubject,
        addOrEditChannel: MutationAddOrEditChannel,
        removeChannel: MutationRemoveChannel,
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
