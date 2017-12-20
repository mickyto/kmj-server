import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getTrainingGroups, setTrainingGroup, removeTrainingGroup } from '../data/trainingGroups';
import { OperationType } from './common';
import { getItem } from '../data/items';
import { ItemType } from './items';


const TrainingGroupType = new GraphQLObjectType({
    name: 'TrainingGroups',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        subject: {
            type: ItemType,
            resolve: ({ subject_id }) => getItem({ id: subject_id, kind: 'subjects' })
        }
    }
});

const QueryTrainingGroups = {
    type: new GraphQLList(TrainingGroupType),
    description: 'Get all training groups',
    args: {
        subject: {
            type: GraphQLInt
        }
    },
    resolve: (root, { subject }) => getTrainingGroups(subject)
};

const MutationSetTrainingGroup = {
    type: TrainingGroupType,
    description: 'Edit or add new training group',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        subject_id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, args) => setTrainingGroup(args)
};

const MutationRemoveTrainingGroup = {
    type: OperationType,
    description: 'Remove one TrainingGroup',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeTrainingGroup(id)
};

export { TrainingGroupType, QueryTrainingGroups, MutationSetTrainingGroup, MutationRemoveTrainingGroup };
