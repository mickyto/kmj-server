import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { QueryUsers, MutationLogin } from './types/users';
import { MutationMagic} from './types/common';
import { QueryClients, QueryClient, MutationAddOrEditClient, MutationMoveClient } from './types/clients';
import { QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil, MutationMakeFavorite } from './types/pupils';
import { QueryTeachers, QueryTeacher, MutationAddOrEditTeacher } from './types/teachers';
import { QueryGroups, QueryGroup, MutationAddOrEditGroup } from './types/groups';
import { QueryFormats, MutationAddOrEditFormat } from './types/formats';
import { QueryTrainings, QueryTraining, MutationAddOrEditTraining } from './types/trainings';
import { QueryPupilResults, MutationAddResult, MutationChangeStatus, MutationResetLevel, MutationCheckChangedResult } from './types/trainingResults';
import { CompileProgramMutation } from './types/compilation';
import { QueryItems, QueryItem, MutationSetItem, MutationRemoveItem } from './types/items';
import { QueryTrainingGroups, MutationSetTrainingGroup } from './types/trainingGroups';
import { QueryWorks, QueryWork, MutationAddOrEditWork, MutationSortExercises, MutationSetGroupWorkDates } from './types/works';
import { QueryExercises, QueryExercise, MutationAddOrEditExercise } from './types/exercises';

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
        items: QueryItems,
        item: QueryItem,
        trainingGroups: QueryTrainingGroups,
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
        addOrEditGroup: MutationAddOrEditGroup,
        addOrEditFormat: MutationAddOrEditFormat,
        addOrEditTraining: MutationAddOrEditTraining,
        addTrainingResult: MutationAddResult,
        checkChangedResult: MutationCheckChangedResult,
        makeFavorite: MutationMakeFavorite,
        changeStatus: MutationChangeStatus,
        resetLevel: MutationResetLevel,
        compileProgram: CompileProgramMutation,
        setItem: MutationSetItem,
        removeItem: MutationRemoveItem,
        setTrainingGroup: MutationSetTrainingGroup,
        addOrEditWork: MutationAddOrEditWork,
        addOrEditExercise: MutationAddOrEditExercise,
        sortExercises: MutationSortExercises,
        setGroupWorkDates: MutationSetGroupWorkDates,
        magic: MutationMagic
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
