import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { getUser, gerUsers } from '../data/users';


const UsersType = {
    type: new GraphQLObjectType,
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
};

const MutationLogin = {
    type: UsersType,
    description: 'Login',
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => getUser(args)
};

const QueryUsers = {
    type: new GraphQLList(UsersType),
    resolve: () => gerUsers()
};

export { MutationLogin, QueryUsers }
