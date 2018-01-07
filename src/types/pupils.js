import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getPupils, getPupil, addOrEditPupil, movePupil, getPupilGroups, getPupilExercises } from '../data/pupils';
import { getClient } from '../data/clients';
import { getPupilTrainingResults, getResultsCount } from '../data/trainingResults';
import { OperationType } from './common';
import { GroupType } from './groups';
import { ClientType } from './clients';
import { ExerciseType } from './exercises';
import { TrainingResultsType } from './trainingResults';

const PupilTrainingResultsType = new GraphQLObjectType({
    name: 'PupilTrainingResults',
    fields: () => ({
        count: {
            type: GraphQLInt
        },
        rows: {
            type: new GraphQLList(TrainingResultsType)
        },
    })
});

const PupilTrainingResultsCountType = new GraphQLObjectType({
    name: 'PupilTrainingResultsCount',
    fields: () => ({
        all: {
            type: GraphQLInt
        },
        correct: {
            type: GraphQLInt
        },
    })
});

const PupilType = new GraphQLObjectType({
    name: 'Pupils',
    fields: () => ({
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
        school: {
            type: GraphQLString
        },
        resultsCount: {
            type: PupilTrainingResultsCountType,
            args: {
                trainingId: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id }, { trainingId }) => getResultsCount({ pupilId: id, trainingId })
        },
        trainingResults: {
            type: PupilTrainingResultsType,
            args: {
                trainingId: {
                    type: GraphQLInt
                },
                pupilId: {
                    type: GraphQLInt
                },
                offset: {
                    type: GraphQLInt
                },
                limit: {
                    type: GraphQLInt
                },
            },
            resolve: ({ id }, { trainingId, pupilId, offset, limit }) => {
                if (pupilId == id)
                    return getPupilTrainingResults({ pupilId: id, trainingId, offset, limit })
            }
        },
        exercises: {
            type: new GraphQLList(ExerciseType),
            args: {
                workId: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id, pupil_works }, { workId }) => getPupilExercises(id, workId || pupil_works.work_id)
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
        },
        group: {
            type: GraphQLInt
        }
    },
    resolve: (root, { show, group }) => getPupils(show, group)
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

export { PupilTrainingResultsType, PupilTrainingResultsCountType, QueryPupils, MutationAddOrEditPupil, MutationMovePupil, QueryPupil, PupilType };
