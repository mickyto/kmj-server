import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} from 'graphql';
import { getTrainings, getTraining, addOrEditTraining, getTrainingPupils } from '../data/trainings';
import { getPupilTrainingResults, getResultsCount } from '../data/trainingResults';
import { getItem } from '../data/items';
import { TrainingGroupType } from './trainingGroups';
import { PupilType, PupilTrainingResultsType, PupilTrainingResultsCountType } from './pupils';


const TrainingType = new GraphQLObjectType({
    name: 'Trainings',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString,
        },
        action: {
            type: GraphQLString,
        },
        controller: {
            type: GraphQLString,
        },
        speed: {
            type: GraphQLInt,
        },
        trainingGroup: {
            type: TrainingGroupType,
            resolve: ({ training_group_id }) => getItem({ id: training_group_id, kind: 'training_groups' })
        },
        pupils: {
            type: new GraphQLList(PupilType),
            resolve: ({ id }) => getTrainingPupils(id)
        },
        resultsCount: {
            type: PupilTrainingResultsCountType,
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: ({ id }, { token }) => getResultsCount({ trainingId: id, token })
        },
        pupilTraining: {
            type: PupilTrainingResultsType,
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: ({ id }, { token }) => getPupilTrainingResults({ trainingId: id, token })
        },
        isActive: {
            type: GraphQLBoolean,
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryTrainings = {
    type: new GraphQLList(TrainingType),
    description: 'Get all trainings',
    args: {
        training_group: {
            type: GraphQLInt
        },
        token: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => getTrainings(args)
};

const QueryTraining = {
    type: TrainingType,
    description: 'Get one training',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getTraining(id)
};

const MutationAddOrEditTraining = {
    type: TrainingType,
    description: 'Add or remove training',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString,
        },
        action: {
            type: GraphQLString,
        },
        controller: {
            type: GraphQLString,
        },
        speed: {
            type: GraphQLInt,
        },
        training_group_id: {
            type: new GraphQLNonNull(GraphQLInt),
        },
        isActive: {
            type: GraphQLBoolean,
        }
    },
    resolve: (root, args) => addOrEditTraining(args)
};

export { TrainingType, QueryTrainings, QueryTraining, MutationAddOrEditTraining };
