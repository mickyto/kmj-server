import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import { getFormats, addOrEditFormat } from '../data/formats';


const FormatType = new GraphQLObjectType({
    name: 'Formats',
    fields: {
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

export { FormatType, QueryFormats, MutationAddOrEditFormat };
