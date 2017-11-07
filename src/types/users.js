import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { getUser, gerUsers } from '../data/users';


const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: {
        userId: {
            type: GraphQLInt
        },
        email: {
            type: GraphQLString
        },
        login: {
            type: GraphQLString
        },
        token: {
            type: GraphQLString
        },
        error: {
            type: GraphQLString
        }
    }
});

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
