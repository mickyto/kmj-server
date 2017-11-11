import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInputObjectType
} from 'graphql';

const IdsType = new GraphQLInputObjectType({
    name: 'IDs',
    fields: {
        ids: {
            type: new GraphQLList(GraphQLInt),
        }
    }
});

const OperationType = new GraphQLObjectType({
    name: 'Operation',
    fields: {
        isSuccess: {
            type: GraphQLBoolean,
            resolve: ({ ok }) => ok === 1
        },
        error: {
            type: GraphQLString,
        }
    }
});

export { IdsType, OperationType }
