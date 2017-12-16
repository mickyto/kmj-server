import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

import { ThemeType } from './themes';
import { WorkExecutionsType } from './workExecutions';
import { WorkContentType } from './works';
import { OperationType } from './common';
import { getExercises, getExercise, getTestsByExerciseId, addOrEditExercise, removeExercise } from '../data/exercises';
import { getTheme } from '../data/themes';
import { getPupilExecution } from '../data/workExecutions';


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
        theme: {
            type: ThemeType,
            resolve: ({ theme_id }) => getTheme(theme_id)
        },
        tests: {
            type: new GraphQLList(TestOutputType),
            resolve: ({ id }) => getTestsByExerciseId(id)
        },
        work_executions: {
            type: WorkExecutionsType
        },
        work_contents: {
            type: WorkContentType
        },
        pupilExecution: {
            type: WorkExecutionsType,
            args: {
                token: {
                    type: GraphQLString
                }
            },
            resolve: ({ id }, { token }) => getPupilExecution(id, token)
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryExercises = {
    type: new GraphQLList(ExerciseType),
    description: 'Get all programming exercises',
    resolve: () => getExercises()
};

const QueryExercise= {
    type: ExerciseType,
    description: 'Get one programming exercise',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getExercise(id)
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
        theme_id: {
            type: GraphQLInt
        },
        tests: {
            type: new GraphQLList(TestInputType)
        }
    },
    resolve: (root, args) => addOrEditExercise(args)
};

const MutationRemoveExercise = {
    type: OperationType,
    description: 'Remove one programming exercise',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeExercise(id)
};

export { ExerciseType, QueryExercises, QueryExercise, MutationAddOrEditExercise, MutationRemoveExercise };
