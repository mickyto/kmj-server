import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getFormats, addOrEditFormat, removeFormat } from '../data/formats';
import { OperationType } from './common';


const FormatsType = new GraphQLObjectType({
    name: 'Formats',
    fields: {
        formatId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        title: {
            type: GraphQLString
        },
        priceForCycle: {
            type: GraphQLInt
        },
        countOfLessons: {
            type: GraphQLInt
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
    type: new GraphQLList(FormatsType),
    description: 'Get all formats',
    resolve: () => getFormats()
};

const MutationAddOrEditFormat = {
    type: FormatsType,
    description: 'Add new format',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        priceForCycle: {
            type: GraphQLInt
        },
        countOfLessons: {
            type: GraphQLInt
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

export { FormatsType, QueryFormats, MutationAddOrEditFormat, MutationRemoveFormat };
