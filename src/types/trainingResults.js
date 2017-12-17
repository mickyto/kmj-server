import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getPupilResults, getResultsCount, addResult, clearPupilResults } from '../data/trainingResults';
import { getPupil } from '../data/pupils';
import { getTraining } from '../data/trainings';

import { OperationType } from './common';
import { PupilType } from './pupils';
import { TrainingType } from './trainings';


const TrainingResultsType = new GraphQLObjectType({
    name: 'TrainingResults',
    fields: () => ({
        resultId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
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
            type: GraphQLString,
            resolve: ({ is_correct }) => is_correct
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

const QueryPupilResults = {
    type: new GraphQLList(TrainingResultsType),
    description: 'Get all results for pupil',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => getPupilResults(id)
};

const PupilTrainingResultsCountType = new GraphQLObjectType({
    name: 'TrainingResultsCount',
    fields: () => ({
        all: {
            type: GraphQLInt
        },
        correct: {
            type: GraphQLInt
        },
    })
});

const QueryPupilTrainingResults = {
    type: PupilTrainingResultsCountType,
    description: 'Get all results for pupil',
    args: {
        token: {
            type: GraphQLString
        },
        trainingId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, args) => getResultsCount(args)
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

const MutationClearPupilResults = {
    type: OperationType,
    description: 'Remove teacher',
    args: {
        pupilId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        trainingId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, args) => clearPupilResults(args)
};

export { TrainingResultsType, PupilTrainingResultsCountType, QueryPupilResults, QueryPupilTrainingResults, MutationAddResult, MutationClearPupilResults };
