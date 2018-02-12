import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLUnionType
} from 'graphql';
import { getItem } from '../data/items';
import { getWorks, addOrEditWork, getWork, getWorkPupils, sortExercises, setGroupWorkDates } from '../data/works';
import { OperationType } from './common';
import { ExerciseType } from './exercises';
import { TrainingType } from './trainings';
import { PupilType } from './pupils';
import { GroupType } from './groups';
import { ItemType } from './items';

const WorkContentType = new GraphQLObjectType({
    name: 'WorkExercises',
    fields: {
        id: {
            type: GraphQLInt
        },
        sort: {
            type: GraphQLString
        }
    }
});

const WorkContentUnionType = new GraphQLUnionType({
    name: 'WorkContent',
    types: () => [ExerciseType, TrainingType],
    resolveType: content => {
        if ('code' in content)
            return ExerciseType;
        else if ('action' in content)
            return TrainingType;
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
        subject: {
            type: ItemType,
            resolve: ({ subject_id }) => getItem({ id: subject_id, kind: 'subjects' })
        },
        content: {
            type: new GraphQLList(WorkContentUnionType),
            resolve: ({ exercises, trainings }) => exercises[0] ? exercises : trainings
        },
        contentCount: {
            type: GraphQLInt,
            resolve: ({ dataValues: { trainingsCount, exercisesCount }}) => trainingsCount || exercisesCount
        },
        pupils: {
            type: new GraphQLList(PupilType),
            resolve: ({ id, groups, pupils = [] }) =>
                getWorkPupils({ id, group: groups && groups[0].id, pupil: groups && groups[0].pupils ? groups[0].pupils[0].id : pupils[0] && pupils[0].id })
        },
        groups: {
            type: new GraphQLList(GroupType)
        },
        grade: {
            type: GraphQLInt,
            resolve: ({ executors }) => executors && executors[0] && executors[0].pupil_work_grades.grade
        },
        type: {
            type: GraphQLString,
            resolve: ({ exercises, trainings, executors }) => exercises[0] ? 'exercises'
                : trainings[0] ? 'trainings' : 'foreign'
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
        },
        withForeign: {
            type: GraphQLBoolean,
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
        subject: {
            type: GraphQLInt
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
