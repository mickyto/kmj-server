import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { gerUsers, getUser } from '../data/users';


const UsersType = new GraphQLObjectType({
    name: 'Users',
    fields: {
        userId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
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

const QueryUsers = {
    type: new GraphQLList(UsersType),
    description: 'Get all users',
    resolve: () => gerUsers()
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



export { QueryUsers, MutationLogin }
