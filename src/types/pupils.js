import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getPupils, getPupil, addOrEditPupil, movePupil, getPupilGroups, getPupilExercises } from '../data/pupils';
import { getClient } from '../data/clients';
import { OperationType } from './common';
import { GroupType } from './groups';
import { ClientType } from './clients';
import { ExerciseType } from './exercises';
import { TrainingResultsType } from './trainingResults';


const PupilType = new GraphQLObjectType({
    name: 'Pupils',
    fields: () => ({
        pupilId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
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
            type: GraphQLString
        },
        school: {
            type: GraphQLString
        },
        pupilTrainings: {
            type: TrainingResultsType,
            resolve: ({ pupil_trainings }) => pupil_trainings
        },
        exercises: {
            type: new GraphQLList(ExerciseType),
            args: {
                workId: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id }, { workId }) => getPupilExercises(id, workId)
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve: ({ id }) => getPupilGroups(id)
        },
        parent: {
            type: ClientType,
            resolve: ({ client_id }) => getClient(client_id)
        },
        status: {
            type: GraphQLString
        },
        error: {
            type: GraphQLString
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
            type: GraphQLString
        },
        groups: {
            type: new GraphQLList(GraphQLInt)
        },
        school: {
            type: GraphQLString
        },
        client_id: {
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
