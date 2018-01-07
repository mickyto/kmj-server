import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';
import { getWorks, addOrEditWork, getWork, getWorkExercises, getWorkPupils,
    getWorkGroups, sortExercises, getWorkTrainings, getGroupPupils } from '../data/works';
import { OperationType } from './common';
import { ExerciseType } from './exercises';
import { TrainingType } from './trainings';
import { PupilType } from './pupils';
import { GroupType } from './groups';

const WorkContentType = new GraphQLObjectType({
    name: 'WorkContent',
    fields: {
        id: {
            type: GraphQLInt
        },
        sort: {
            type: GraphQLString
        }
    }
});

const WorkType = new GraphQLObjectType({
    name: 'Works',
    fields: () => ({
        id: {
            type: GraphQLInt,
        },
        title: {
            type: GraphQLString
        },
        exercises: {
            type: new GraphQLList(ExerciseType),
            resolve: ({ id }) => getWorkExercises(id)
        },
        trainings: {
            type: new GraphQLList(TrainingType),
            resolve: ({ id }) => getWorkTrainings(id)
        },
        pupils: {
            type: new GraphQLList(PupilType),
            args: {
                group: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id }, { group }) => getWorkPupils(id, group)
        },
        groupPupils: {
            type: new GraphQLList(PupilType),
            args: {
                group: {
                    type: GraphQLInt
                }
            },
            resolve: ({ id }, { group }) => getGroupPupils(id, group)
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve: ({ id }) => getWorkGroups(id)
        },
        counts: {
            type: CountsType,
            resolve: ({ three, four, five }) => ({ three, four, five })
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryWork = {
    description: 'Get one work',
    type: WorkType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getWork(id)
};

const QueryWorks = {
    type: new GraphQLList(WorkType),
    description: 'Get all works or works of pupil',
    args: {
        token: {
            type: GraphQLString
        }
    },
    resolve: (root, { token }) => getWorks(token)
};

const CountsType = new GraphQLObjectType({
    name: 'Counts',
    fields: {
        three: {
            type: GraphQLInt
        },
        four: {
            type: GraphQLInt
        },
        five: {
            type: GraphQLInt
        },
    }
});

const CountsInputType = new GraphQLInputObjectType({
    name: 'CountsInput',
    fields: {
        three: {
            type: GraphQLInt
        },
        four: {
            type: GraphQLInt
        },
        five: {
            type: GraphQLInt
        },
    }
});

const MutationAddOrEditWork = {
    type: WorkType,
    description: 'Add or remove work',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        exercises: {
            type: new GraphQLList(GraphQLInt),
        },
        trainings: {
            type: new GraphQLList(GraphQLInt),
        },
        pupils: {
            type: new GraphQLList(GraphQLInt),
        },
        groups: {
            type: new GraphQLList(GraphQLInt),
        },
        counts: {
            type: CountsInputType
        }
    },
    resolve: (root, args) => addOrEditWork(args)
};

const SortType = new GraphQLInputObjectType({
    name: 'Sort',
    fields: {
        id: {
            type: GraphQLInt
        },
        order: {
            type: GraphQLInt
        }
    }
});

const MutationSortExercises = {
    type: OperationType,
    description: 'Sort exercises of work',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        sort: {
            type: new GraphQLList(SortType)
        }
    },
    resolve: (root, args) => sortExercises(args)
};

export { WorkType, WorkContentType, QueryWorks, QueryWork, MutationAddOrEditWork, MutationSortExercises };
