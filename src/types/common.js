import { GraphQLObjectType, GraphQLInt } from 'graphql';

const OperationType = new GraphQLObjectType({
    name: 'Operation',
    fields: {
        isSuccess: {
            type: GraphQLInt,
            resolve: result => result == 1
        }
    }
});

export { OperationType };
