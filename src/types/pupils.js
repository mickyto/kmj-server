import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql';

import { getPupils, getPupil, addOrEditPupil, movePupil, getTrainingWorkResults, makeFavorite } from '../data/pupils';
import { getClient } from '../data/clients';
import { getPupilTrainingResults, getResultsCount } from '../data/trainingResults';
import { OperationType } from './common';
import { GroupType } from './groups';
import { ClientType } from './clients';
import { TrainingResultsType } from './trainingResults';

const PupilTrainingResultsCountType = new GraphQLObjectType({
    name: 'PupilTrainingResultsCount',
    fields: {
        incorrect: {
            type: GraphQLInt
        },
        correct: {
            type: GraphQLInt
        },
        fixed: {
            type: GraphQLInt
        },
        exIncorrect: {
            type: GraphQLInt
        },
        exCorrect: {
            type: GraphQLInt
        },
        exFixed: {
            type: GraphQLInt
        },
        changed: {
            type: GraphQLInt
        },
        exChanged: {
            type: GraphQLInt
        },
    }
});

const TrainingWorkType = new GraphQLObjectType({
    name: 'TrainingWork',
    fields: {
        levelCount: {
            type: GraphQLInt
        },
        solved: {
            type: GraphQLInt
        },
        plusLevel: {
            type: GraphQLInt
        }
    }
});

const PupilType = new GraphQLObjectType({
    name: 'Pupils',
    fields: () => ({
        id: {
            type: GraphQLInt,
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
            type: new GraphQLList(TrainingResultsType),
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
        trainingWork: {
            type: TrainingWorkType,
            resolve: ({ trainings }) => getTrainingWorkResults(trainings)
        },
        solvedCount: {
            type: GraphQLInt,
            resolve: ({ dataValues: { solvedCount }}) => solvedCount
        },
        points: {
            type: GraphQLFloat,
            resolve: ({ dataValues: { points }}) => points
        },
        groups: {
            type: new GraphQLList(GroupType)
        },
        parent: {
            type: ClientType,
            resolve: ({ client_id }) => getClient(client_id)
        },
        grade: {
            type: GraphQLString,
            resolve: ({ tasks }) => tasks[0] && tasks[0].pupil_work_grades.grade
        },
        status: {
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
        },
        token: {
            type: GraphQLString
        }
    },
    resolve: (root, { id, token }) => getPupil(id, token)
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

const MutationMakeFavorite = {
    type: OperationType,
    description: 'Mark training or exercise as favorite',
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        kind: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, args) => makeFavorite(args)
};

export { PupilTrainingResultsCountType, QueryPupils, MutationMakeFavorite,
    MutationAddOrEditPupil, MutationMovePupil, QueryPupil, PupilType };
