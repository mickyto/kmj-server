import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';
import { nodeField } from './utils/node';
import UsersType from './types/users';
import { Users } from './mongoData';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        users: {
            type: new GraphQLList(UsersType),
            resolve: () => {
                return new Promise((resolve, reject) => {
                    Users.find((err, users) => {
                        console.log(users)
                        if (err) reject(err);
                        else resolve(users)
                    })
                })
            }
        },

    })
});

const schema = new GraphQLSchema({
    query: queryType
});

export default schema;
