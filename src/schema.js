import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { QueryUsers, MutationLogin } from './types/users';
import { MutationMagic} from './types/common';
import { QueryClients, QueryClient, MutationAddOrEditClient, MutationMoveClient } from './types/clients';
import { QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil } from './types/pupils';
import { QueryTeachers, QueryTeacher, MutationAddOrEditTeacher, MutationRemoveTeacher } from './types/teachers';
import { QueryGroups, QueryGroup, MutationAddOrEditGroup, MutationRemoveGroup } from './types/groups';
import { QueryFormats, MutationAddOrEditFormat, MutationRemoveFormat } from './types/formats';
import { QueryTrainings, QueryTraining, MutationAddOrEditTraining, MutationRemoveTraining } from './types/trainings';
import { QueryPupilResults, QueryPupilTrainingResults, MutationAddResult, MutationClearPupilResults } from './types/trainingResults';
import { CompileProgramMutation } from './types/compilation';
import { QueryItems, QueryItem, MutationSetItem, MutationRemoveItem } from './types/items';
import { QueryWorks, QueryWork, MutationAddOrEditWork, MutationRemoveWork, MutationSortExercises } from './types/works';
import { QueryExercises, QueryExercise, MutationAddOrEditExercise, MutationRemoveExercise } from './types/exercises';

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
        trainings: QueryTrainings,
        training: QueryTraining,
        pupilResults: QueryPupilResults,
        pupilTrainingResults: QueryPupilTrainingResults,
        items: QueryItems,
        item: QueryItem,
        works: QueryWorks,
        work: QueryWork,
        exercises: QueryExercises,
        exercise: QueryExercise,
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
        addOrEditTraining: MutationAddOrEditTraining,
        removeTraining: MutationRemoveTraining,
        addTrainingResult: MutationAddResult,
        clearTrainingResult: MutationClearPupilResults,
        compileProgram: CompileProgramMutation,
        setItem: MutationSetItem,
        removeItem: MutationRemoveItem,
        addOrEditWork: MutationAddOrEditWork,
        removeWork: MutationRemoveWork,
        addOrEditExercise: MutationAddOrEditExercise,
        removeExercise: MutationRemoveExercise,
        sortExercises: MutationSortExercises,
        magic: MutationMagic
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
