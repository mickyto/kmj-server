import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql';

import { ItemType } from './items';
import { WorkExecutionsType } from './workExecutions';
import { WorkContentType } from './works';
import { getExercises, getExercise, addOrEditExercise } from '../data/exercises';


const TestInputType = new GraphQLInputObjectType({
    name: 'TestInput',
    fields: {
        id: {
            type: GraphQLInt
        },
        cin: {
            type: GraphQLString
        },
        cout: {
            type: GraphQLString
        },
        sort: {
            type: GraphQLInt
        }
    }
});

const TestOutputType = new GraphQLObjectType({
    name: 'TestOutput',
    fields: {
        id: {
            type: GraphQLInt
        },
        cin: {
            type: GraphQLString
        },
        cout: {
            type: GraphQLString
        },
        sort: {
            type: GraphQLInt
        }
    }
});

const ExerciseType = new GraphQLObjectType({
    name: 'Exercises',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        text: {
            type: GraphQLString,
        },
        code: {
            type: GraphQLString,
        },
        start: {
            type: GraphQLString,
        },
        end: {
            type: GraphQLString,
        },
        theme: {
            type: ItemType
        },
        tests: {
            type: new GraphQLList(TestOutputType),
        },
        work_executions: {
            type: WorkExecutionsType,
            resolve: ({ pupils }) => pupils[0] && pupils[0].work_executions
        },
        work_contents: {
            type: WorkContentType
        },
        favorite: {
            type: GraphQLBoolean,
            resolve: ({ admirer }) => !!admirer[0]
        }
    })
});

const QueryExercises = {
    type: new GraphQLList(ExerciseType),
    description: 'Get programming exercises',
    args: {
        theme: {
            type: GraphQLInt
        }
    },
    resolve: (root, { theme }) => getExercises(theme)
};

const QueryExercise = {
    type: ExerciseType,
    description: 'Get one programming exercise',
    args: {
        id: {
            type: GraphQLInt
        },
        token: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => getExercise(args)
};

const MutationAddOrEditExercise = {
    type: ExerciseType,
    description: 'Edit or add new programming exercise',
    args: {
        id: {
            type: GraphQLInt
        },
        text: {
            type: GraphQLString,
        },
        code: {
            type: GraphQLString,
        },
        start: {
            type: GraphQLString,
        },
        end: {
            type: GraphQLString,
        },
        theme_id: {
            type: GraphQLInt
        },
        tests: {
            type: new GraphQLList(TestInputType)
        }
    },
    resolve: (root, args) => addOrEditExercise(args)
};

export { ExerciseType, QueryExercises, QueryExercise, MutationAddOrEditExercise };
