import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { QueryUsers, MutationLogin } from './types/users';
import { QueryClients, QueryClient, MutationAddOrEditClient, MutationMoveClient } from './types/clients';
import { QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil } from './types/pupils';
import { QueryTeachers, QueryTeacher, MutationAddOrEditTeacher, MutationRemoveTeacher } from './types/teachers';
import { QueryGroups, QueryGroup, MutationAddOrEditGroup, MutationRemoveGroup } from './types/groups';
import { QueryFormats, MutationAddOrEditFormat, MutationRemoveFormat } from './types/formats';
import { QuerySubjects, MutationAddOrEditSubject, MutationRemoveSubject } from './types/subjects';
import { QueryChannels, MutationAddOrEditChannel, MutationRemoveChannel } from './types/channels';
import { QueryTrainings, QueryTraining, MutationAddOrEditTraining, MutationRemoveTraining } from './types/trainings';
import { QueryPupilResults, QueryPupilTrainingResults, MutationAddResult, MutationClearPupilResults } from './types/trainingResults';


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        users: QueryUsers,
        clients: QueryClients,
        client: QueryClient,
        pupils: QueryPupils,
        pupil: QueryPupil,
        teachers: QueryTeachers,
        teacher: QueryTeacher,
        groups: QueryGroups,
        group: QueryGroup,
        formats: QueryFormats,
        subjects: QuerySubjects,
        channels: QueryChannels,
        trainings: QueryTrainings,
        training: QueryTraining,
        pupilResults: QueryPupilResults,
        pupilTrainingResults: QueryPupilTrainingResults,
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
        addOrEditTeacher: MutationAddOrEditTeacher,
        removeTeacher: MutationRemoveTeacher,
        addOrEditGroup: MutationAddOrEditGroup,
        removeGroup: MutationRemoveGroup,
        addOrEditFormat: MutationAddOrEditFormat,
        removeFormat: MutationRemoveFormat,
        addOrEditSubject: MutationAddOrEditSubject,
        removeSubject: MutationRemoveSubject,
        addOrEditChannel: MutationAddOrEditChannel,
        removeChannel: MutationRemoveChannel,
        addOrEditTraining: MutationAddOrEditTraining,
        removeTraining: MutationRemoveTraining,
        addTrainingResult: MutationAddResult,
        clearTrainingResult: MutationClearPupilResults,
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
