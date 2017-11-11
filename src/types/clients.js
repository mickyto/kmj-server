import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getClients, addClient, alterClients, getClient } from '../data/clients';
import { getPupilByClientId } from '../data/pupils';
import { IdsType, OperationType } from './common';
import { PupilsType } from './pupils';


const ClientsType = new GraphQLObjectType({
    name: 'Clients',
    fields: () => ({
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

const MutationClients = {
    type: ClientsType,
    description: 'Add new client',
    args: {
        id: {
            type: GraphQLInt
        },
        fio: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        where_from: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addClient(args)
};

const MutationAlterClients = {
    type: OperationType,
    description: 'Move client to trash',
    args: {
        ids: {
            type: new GraphQLNonNull(IdsType)
        },
        operation: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => {
        return alterClients(args)
    }
};

const QueryClients = {
    type: new GraphQLList(ClientsType),
    args: {
        show: {
            type: GraphQLString
        }
    },
    resolve: (root, { show }) => {
        return getClients(show)
    }
};

const QueryClient = {
    type: ClientsType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => {
        return getClient(id)
    }
};

export { QueryClients, MutationClients, MutationAlterClients, QueryClient, ClientsType }
