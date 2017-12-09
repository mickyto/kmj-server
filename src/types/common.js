import { doMagic } from '../data/magic';

import {
    GraphQLObjectType,
    GraphQLInt,
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
        isSuccess: {
            type: GraphQLInt,
            resolve: (result) => result == 1
        }
    }
});

const MutationMagic = {
    type: OperationType,
    description: 'Do magic under DB',
    resolve: () => doMagic()
};

export { IdType, OperationType, MutationMagic }
