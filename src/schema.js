import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';
import { nodeField } from './utils/node';
import UsersType from './types/users';
import { Users, getUser } from './mongoData';

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
    resolve: (root, args) => {
        return getUser(args);
    }
};

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        node: nodeField,
        users: {
            type: new GraphQLList(UsersType),
            resolve: () => {
                return new Promise((resolve, reject) => {
                    Users.find((err, users) => {
                        if (err) reject(err);
                        else resolve(users)
                    })
                })
            }
        },

    }
});

var MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: MutationLogin
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: MutationType
});

export default schema;
