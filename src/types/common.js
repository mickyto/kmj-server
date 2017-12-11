import { doMagic } from '../data/magic';

import {
    GraphQLObjectType,
    GraphQLInt
} from 'graphql';

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

export { OperationType, MutationMagic }
