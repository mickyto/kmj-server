import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getThemes, addOrEditTheme, removeTheme } from '../data/themes';
import { OperationType } from './common';


const ThemeType = new GraphQLObjectType({
    name: 'Themes',
    fields: {
        themeId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryThemes = {
    type: new GraphQLList(ThemeType),
    description: 'Get all themes',
    resolve: () => getThemes()
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

export { ThemeType, QueryThemes, MutationAddOrEditTheme, MutationRemoveTheme };
