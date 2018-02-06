import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';
import { getWorks, addOrEditWork, getWork, getWorkPupils,
    sortExercises, getGroupPupils, setGroupWorkDates } from '../data/works';
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
        },
        trainings: {
            type: new GraphQLList(TrainingType),
        },
        contentCount: {
            type: GraphQLInt,
            resolve: ({ dataValues: { trainingsCount, exercisesCount }}) => trainingsCount || exercisesCount
        },
        pupils: {
            type: new GraphQLList(PupilType),
            resolve: ({ id }) => getWorkPupils(id)
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
            type: new GraphQLList(GroupType)
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
        id: {
            type: GraphQLInt
        },
        token: {
            type: GraphQLString
        },
        group: {
            type: GraphQLInt
        },
        type: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => getWorks(args)
};

const PupilGradeInputType = new GraphQLInputObjectType({
    name: 'PupilGradeInput',
    fields: {
        id: {
            type: GraphQLInt
        },
        grade: {
            type: GraphQLString
        }
    }
});

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
        },
        grades: {
            type: new GraphQLList(PupilGradeInputType),
        },
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
    description: 'Sort exercises or trainings of a work',
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

const DateType = new GraphQLInputObjectType({
    name: 'Date',
    fields: {
        id: {
            type: GraphQLInt
        },
        date: {
            type: GraphQLString
        }
    }
});

const MutationSetGroupWorkDates = {
    type: OperationType,
    description: 'Set dates when work has been given to groups',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        dates: {
            type: new GraphQLList(DateType)
        }
    },
    resolve: (root, args) => setGroupWorkDates(args)
};

export { WorkType, WorkContentType, QueryWorks, QueryWork, MutationAddOrEditWork, MutationSortExercises, MutationSetGroupWorkDates };
