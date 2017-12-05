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
import { CompileProgramMutation } from './types/compilation';
import { QueryThemes, QueryTheme, MutationAddOrEditTheme, MutationRemoveTheme } from './types/themes';
import { QueryWorks, MutationAddOrEditWork, MutationRemoveWork } from './types/works';
import { QueryProgExercises, QueryProgExercise, MutationAddOrEditProgExercise, MutationRemoveProgExercise } from './types/progExercises';

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
        themes: QueryThemes,
        theme: QueryTheme,
        works: QueryWorks,
        progExercises: QueryProgExercises,
        progExercise: QueryProgExercise,
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
        compileProgram: CompileProgramMutation,
        addOrEditTheme: MutationAddOrEditTheme,
        removeTheme: MutationRemoveTheme,
        addOrEditWork: MutationAddOrEditWork,
        removeWork: MutationRemoveWork,
        addOrEditProgExercise: MutationAddOrEditProgExercise,
        removeProgExercise: MutationRemoveProgExercise,
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
