import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getPupilTrainingResults, addResult, changeStatus, resetLevel, checkChangedResult } from '../data/trainingResults';
import { getPupil } from '../data/pupils';
import { getTraining } from '../data/trainings';

import { OperationType } from './common';
import { PupilType } from './pupils';
import { TrainingType } from './trainings';


const TrainingResultsType = new GraphQLObjectType({
    name: 'TrainingResults',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        pupil: {
            type: PupilType,
            resolve: ({ pupil_id }) => getPupil(pupil_id)
        },
        training: {
            type: TrainingType,
            resolve: ({ training_id }) => getTraining(training_id)
        },
        tex: {
            type: GraphQLString,
        },
        isCorrect: {
            type: GraphQLInt,
            resolve: ({ status }) => status
        },
        pupilAnswer: {
            type: GraphQLString,
            resolve: ({ pupil_answer }) => pupil_answer
        },
        rightAnswer: {
            type: GraphQLString,
            resolve: ({ right_answer }) => right_answer
        },
        date: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryChangedResults = {
    type: new GraphQLList(TrainingResultsType),
    description: 'Get all changed results',
    args: {
        offset: {
            type: GraphQLInt
        },
        limit: {
            type: GraphQLInt
        }
    },
    resolve: (root, { offset, limit }) => getPupilTrainingResults({ offset, limit })
};

const MutationAddResult = {
    type: TrainingResultsType,
    description: 'Add training result',
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        trainingId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tex: {
            type: new GraphQLNonNull(GraphQLString)
        },
        pupilAnswer: {
            type: new GraphQLNonNull(GraphQLString)
        },
        rightAnswer: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => addResult(args)
};

const MutationChangeStatus = {
    type: OperationType,
    description: 'Change training result status',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => changeStatus(id)
};

const MutationResetLevel = {
    type: OperationType,
    description: 'Reset training level of pupil',
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        trainingId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, args) => resetLevel(args)
};

const MutationCheckChangedResult = {
    type: TrainingResultsType,
    description: 'Accept or reject pupil changed result',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        isAccepted: {
            type: new GraphQLNonNull(GraphQLBoolean)
        }
    },
    resolve: (root, args) => checkChangedResult(args)
};

export { TrainingResultsType, QueryChangedResults, MutationAddResult, MutationCheckChangedResult,
    MutationChangeStatus, MutationResetLevel };
