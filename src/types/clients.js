import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getClients, getClient, addOrEditClient, moveClients } from '../data/clients';
import { OperationType } from './common';
import { ItemType } from '../types/items';
import { PupilType } from './pupils';


const ClientType = new GraphQLObjectType({
    name: 'Clients',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        fio: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        channel: {
            type: ItemType
        },
        location: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        pupils: {
            type: new GraphQLList(PupilType)
        },
        status: {
            type: GraphQLString,
        }
    })
});

const QueryClients = {
    type: new GraphQLList(ClientType),
    description: 'Get all clients',
    args: {
        show: {
            type: GraphQLString
        }
    },
    resolve: (root, { show }) => getClients(show)
};

const QueryClient = {
    description: 'Get one client',
    type: ClientType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getClient(id)
};

const MutationAddOrEditClient = {
    type: ClientType,
    description: 'Edit or add new client',
    args: {
        id: {
            type: GraphQLInt
        },
        fio: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phone: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        channel_id: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    },
    resolve: (root, args) => addOrEditClient(args)
};

const MutationMoveClient = {
    type: OperationType,
    description: 'Mark client as removed, recover or remove forever',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        operation: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => moveClients(args)
};

export { ClientType, QueryClients, QueryClient,  MutationAddOrEditClient, MutationMoveClient }
