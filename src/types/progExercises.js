import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

import { ThemeType } from './themes';
import { OperationType } from './common';
import { getProgExercises, getProgExercise, getTestsByProgExerciseId, addOrEditProgExercise, removeProgExercise } from '../data/progExercises';
import { getTheme } from '../data/themes';


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


const ProgExerciseType = new GraphQLObjectType({
    name: 'ProgExercises',
    fields: () => ({
        exerciseId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
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
            resolve: ({ id }) => getTestsByProgExerciseId(id)
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryProgExercises = {
    type: new GraphQLList(ProgExerciseType),
    description: 'Get all programming exercises',
    resolve: () => getProgExercises()
};

const QueryProgExercise= {
    type: ProgExerciseType,
    description: 'Get one programming exercise',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getProgExercise(id)
};

const MutationAddOrEditProgExercise = {
    type: ProgExerciseType,
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
    resolve: (root, args) => addOrEditProgExercise(args)
};

const MutationRemoveProgExercise = {
    type: OperationType,
    description: 'Remove one programming exercise',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeProgExercise(id)
};

export { ProgExerciseType, QueryProgExercises, QueryProgExercise, MutationAddOrEditProgExercise, MutationRemoveProgExercise };
