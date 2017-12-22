import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql';

import { ItemType } from './items';
import { WorkExecutionsType } from './workExecutions';
import { WorkContentType } from './works';
import { getExercises, getExercise, getTestsByExerciseId, addOrEditExercise } from '../data/exercises';
import { getItem } from '../data/items';
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
            type: ItemType,
            resolve: ({ theme_id }) => getItem({ id: theme_id, kind: 'themes' })
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
    description: 'Get programming exercises',
    args: {
        theme: {
            type: GraphQLInt
        }
    },
    resolve: (root, { theme }) => getExercises(theme)
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

export { ExerciseType, QueryExercises, QueryExercise, MutationAddOrEditExercise };
