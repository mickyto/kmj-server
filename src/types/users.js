import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
    name: 'Users',
    fields: {
        id: globalIdField('Users'),
        userId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        email: {
            type: GraphQLString,
            resolve: ({ email }) => email
        },
        login: {
            type: GraphQLString,
            resolve: ({ login }) => login
        },
        token: {
            type: GraphQLString,
            resolve: ({ token }) => token
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});
