import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLFloat
} from 'graphql';
import { getTrainings, getTraining, addOrEditTraining, getTrainingPupils } from '../data/trainings';
import { getPupilTrainingResults, getResultsCount } from '../data/trainingResults';
import { getItem } from '../data/items';
import { WorkContentType } from './works';
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
            type: GraphQLFloat,
        },
        work_trainings: {
            type: WorkContentType
        },
        theme: {
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
                },
                pupilId: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id, pupil_trainings }, { token, pupilId }) =>
                getResultsCount({ trainingId: id, token, pupilId: pupil_trainings ? pupil_trainings.pupil_id : pupilId })
        },
        pupilTraining: {
            type: PupilTrainingResultsType,
            args: {
                token: {
                    type: GraphQLString
                },
                pupilId: {
                    type: GraphQLInt
                },
                trainingId: {
                    type: GraphQLInt
                },
                offset: {
                    type: GraphQLInt
                },
                limit: {
                    type: GraphQLInt
                },
            },
            resolve: ({ id }, { token, pupilId, trainingId, offset, limit }) => {
                if (trainingId == id)
                    return getPupilTrainingResults({ trainingId: id, token, pupilId, offset, limit })
            }
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
            type: GraphQLFloat,
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
