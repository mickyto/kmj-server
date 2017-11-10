import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { getClients, addClient } from '../data/clients';


const ClientsType = new GraphQLObjectType({
    name: 'Clients',
    fields: {
        clientId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        email: {
            type: GraphQLString,
        },
        fio: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
        where_from: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const MutationClients = {
    type: ClientsType,
    description: 'Clients',
    args: {
        fio: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        where_from: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return addClient(args)
    }
};

const QueryClients = {
    type: new GraphQLList(ClientsType),
    resolve: () => getClients()
};

export { QueryClients, MutationClients }
