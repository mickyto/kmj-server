import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getPupils, getPupil, addOrEditPupil, movePupil} from '../data/pupils';
import { getGroups } from '../data/groups';
import { getClient } from '../data/clients';
import { IdType, OperationType } from './common';
import { GroupType } from './groups';
import { ClientType } from './clients';


const PupilType = new GraphQLObjectType({
    name: 'Pupils',
    fields: () => ({
        pupilId: {
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
        class: {
            type: GraphQLInt,
        },
        school: {
            type: GraphQLString,
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve: ({ groups }) => getGroups(groups)
        },
        parent: {
            type: ClientType,
            resolve: ({ clientId }) => getClient(clientId)
        },
        status: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryPupils = {
    type: new GraphQLList(PupilType),
    description: 'Get all pupils',
    args: {
        show: {
            type: GraphQLString
        }
    },
    resolve: (root, { show }) => getPupils(show)
};

const QueryPupil = {
    type: PupilType,
    description: 'Get one pupil',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getPupil(id)
};

const MutationAddOrEditPupil = {
    type: PupilType,
    description: 'Edit or add new pupil',
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
        class: {
            type: GraphQLInt,
        },
        groups: {
            type: new GraphQLList(IdType),
        },
        school: {
            type: GraphQLString,
        },
        clientId: {
            type: GraphQLInt
        }
    },
    resolve: (root, args) => addOrEditPupil(args)
};

const MutationMovePupil = {
    type: OperationType,
    description: 'Mark pupil as removed, recover or remove forever',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        operation: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => movePupil(args)
};

export { QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil, PupilType };
