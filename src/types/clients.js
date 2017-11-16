import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getClients, getClient, addOrEditClient, moveClients } from '../data/clients';
import { getPupilByClientId } from '../data/pupils';
import { OperationType } from './common';
import { PupilsType } from './pupils';


const ClientsType = new GraphQLObjectType({
    name: 'Clients',
    fields: () => ({
        clientId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
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
        where_from: {
            type: GraphQLString,
        },
        location: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        pupil: {
            type: PupilsType,
            resolve: ({ _id }) => getPupilByClientId(_id)
        },
        status: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryClients = {
    type: new GraphQLList(ClientsType),
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
    type: ClientsType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getClient(id)
};

const MutationAddOrEditClient = {
    type: ClientsType,
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
        where_from: {
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

const MutationMoveClients = {
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
    resolve: (root, args) => {
        return moveClients(args)
    }
};

export { ClientsType, QueryClients, QueryClient,  MutationAddOrEditClient, MutationMoveClients }
