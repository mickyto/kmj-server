import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import { gerClients } from '../data/clients';


const ClientsType = new GraphQLObjectType({
    name: 'Clients',
    fields: {
        clientId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        email: {
            type: GraphQLString
        },
        fio: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        where_from: {
            type: GraphQLString
        }
    }
});

const QueryClients = {
    type: new GraphQLList(ClientsType),
    resolve: () => gerClients()
};

export { QueryClients }
