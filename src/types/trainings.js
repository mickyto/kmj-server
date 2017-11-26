import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getTrainings, getTraining, addOrEditTraining, removeTraining } from '../data/trainings';
import { getSubject } from '../data/subjects';
import { OperationType } from './common';
import { SubjectType } from './subjects';


const TrainingType = new GraphQLObjectType({
    name: 'Trainings',
    fields: {
        trainingId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString,
        },
        action: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLString,
        },
        subject: {
            type: SubjectType,
            resolve: ({ subject_id }) => getSubject(subject_id)
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryTrainings = {
    type: new GraphQLList(TrainingType),
    description: 'Get all trainings',
    args: {
        show: {
            type: GraphQLInt
        }
    },
    resolve: (root, { show }) => getTrainings(show)
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
        url: {
            type: GraphQLString,
        },
        subject_id: {
            type: GraphQLInt,
        }
    },
    resolve: (root, args) => addOrEditTraining(args)
};

const MutationRemoveTraining = {
    type: OperationType,
    description: 'Remove one training',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeTraining(id)
};

export { TrainingType, QueryTrainings, QueryTraining, MutationAddOrEditTraining, MutationRemoveTraining };
