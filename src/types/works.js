import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getWorks, addOrEditWork, removeWork } from '../data/works';
import { OperationType } from './common';


const WorkType = new GraphQLObjectType({
    name: 'Works',
    fields: {
        workId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryWorks = {
    type: new GraphQLList(WorkType),
    description: 'Get all works',
    resolve: () => getWorks()
};

const MutationAddOrEditWork = {
    type: WorkType,
    description: 'Add or remove work',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addOrEditWork(args)
};

const MutationRemoveWork = {
    type: OperationType,
    description: 'Remove one work',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeWork(id)
};

export { WorkType, QueryWorks, MutationAddOrEditWork, MutationRemoveWork };
