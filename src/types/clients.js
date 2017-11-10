import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInputObjectType
} from 'graphql';

import { getClients, addClient, alterClients } from '../data/clients';


const IdsType = new GraphQLInputObjectType({
    name: 'IDs',
    fields: {
        ids: {
            type: new GraphQLList(GraphQLInt),
        }
    }
});

const OperationType = new GraphQLObjectType({
    name: 'Operation',
    fields: {
        isSuccess: {
            type: GraphQLBoolean,
            resolve: ({ ok }) => ok === 1
        },
        error: {
            type: GraphQLString,
        }
    }
});

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
        status: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const MutationClients = {
    type: ClientsType,
    description: 'Add new client',
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

export { QueryClients, MutationClients, MutationAlterClients }
