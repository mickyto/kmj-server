import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getFormats, addOrEditFormat, removeFormat } from '../data/formats';
import { OperationType } from './common';


const FormatType = new GraphQLObjectType({
    name: 'Formats',
    fields: {
        formatId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString
        },
        priceForCycle: {
            type: GraphQLString
        },
        countOfLessons: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLString
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryFormats = {
    type: new GraphQLList(FormatType),
    description: 'Get all formats',
    resolve: () => getFormats()
};

const MutationAddOrEditFormat = {
    type: FormatType,
    description: 'Edit or add new format',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        priceForCycle: {
            type: GraphQLString
        },
        countOfLessons: {
            type: GraphQLString
        },
        duration: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addOrEditFormat(args)
};

const MutationRemoveFormat = {
    type: OperationType,
    description: 'Remove one format',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeFormat(id)
};

export { FormatType, QueryFormats, MutationAddOrEditFormat, MutationRemoveFormat };
