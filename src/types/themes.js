import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getThemes, getTheme, addOrEditTheme, removeTheme } from '../data/themes';
import { getProgExercisesByTheme } from '../data/progExercises';
import { OperationType } from './common';
import { ProgExerciseType } from './progExercises';


const ThemeType = new GraphQLObjectType({
    name: 'Themes',
    fields: () => ({
        themeId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString,
        },
        exercises: {
            type: new GraphQLList(ProgExerciseType),
            resolve: ({ id }) => getProgExercisesByTheme(id)
        },
        error: {
            type: GraphQLString,
        }
    })
});

const QueryThemes = {
    type: new GraphQLList(ThemeType),
    description: 'Get all themes',
    resolve: () => getThemes()
};

const QueryTheme = {
    type: ThemeType,
    description: 'Get one theme',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getTheme(id)
};

const MutationAddOrEditTheme = {
    type: ThemeType,
    description: 'Add or remove theme',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addOrEditTheme(args)
};

const MutationRemoveTheme = {
    type: OperationType,
    description: 'Remove one theme',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeTheme(id)
};

export { ThemeType, QueryTheme, QueryThemes, MutationAddOrEditTheme, MutationRemoveTheme };