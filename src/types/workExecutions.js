import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getPupilResults, getPupilWorkExecutions, addResult, clearPupilResults } from '../data/workExecutions';
import { getPupil } from '../data/pupils';

import { OperationType } from './common';
import { PupilType } from './pupils';


const WorkExecutionsType = new GraphQLObjectType({
    name: 'WorkExecutions',
    fields: {
        id: {
            type: GraphQLInt
        },
        pupil: {
            type: PupilType,
            resolve: ({ pupil_id }) => getPupil(pupil_id)
        },
        program: {
            type: GraphQLString,
        },
        status: {
            type: GraphQLInt
        },
        date: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryPupilResults = {
    type: new GraphQLList(WorkExecutionsType),
    description: 'Get all results for pupil',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => getPupilResults(id)
};

const QueryPupilWorkExecutions = {
    type: new GraphQLList(WorkExecutionsType),
    description: 'Get all results for pupil',
    args: {
        workId: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        pupilId: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, args) => getPupilWorkExecutions(args)
};

const MutationAddResult = {
    type: WorkExecutionsType,
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

export { WorkExecutionsType, QueryPupilResults, QueryPupilWorkExecutions, MutationAddResult, MutationClearPupilResults };
