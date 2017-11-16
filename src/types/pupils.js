import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getPupils, addPupil, alterPupils, getPupil} from '../data/pupils';
import { getSubjects } from '../data/subjects';
import { getClient } from '../data/clients';
import { IdsType, OperationType } from './common';
import { SubjectsType } from './subjects';
import { ClientsType } from './clients';


const PupilsType = new GraphQLObjectType({
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
        subjects: {
            type: new GraphQLList(SubjectsType),
            resolve: ({ subjects }) => getSubjects(subjects.ids)
        },
        parent: {
            type: ClientsType,
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

const MutationPupils = {
    type: PupilsType,
    description: 'Add new pupil',
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
        subjects: {
            type: IdsType,
        },
        school: {
            type: GraphQLString,
        },
        clientId: {
            type: GraphQLInt
        }
    },
    resolve: (root, args) => {
        return addPupil(args)
    }
};

const MutationAlterPupils = {
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
        return alterPupils(args)
    }
};

const QueryPupils = {
    type: new GraphQLList(PupilsType),
    args: {
        show: {
            type: GraphQLString
        }
    },
    resolve: (root, { show }) => {
        return getPupils(show)
    }
};

const QueryPupil = {
    type: PupilsType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => {
        return getPupil(id)
    }
};

export { QueryPupils, MutationPupils, MutationAlterPupils, QueryPupil, PupilsType };
