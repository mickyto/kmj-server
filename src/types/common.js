import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType
} from 'graphql';

const IdType = new GraphQLInputObjectType({
    name: 'IDs',
    fields: {
        id: {
            type: GraphQLInt,
        }
    }
});

const OperationType = new GraphQLObjectType({
    name: 'Operation',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        isSuccess: {
            type: GraphQLBoolean,
            resolve: ({ ok }) => ok === 1
        },
        error: {
            type: GraphQLString,
        }
    }
});

export { IdType, OperationType }
