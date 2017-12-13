import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} from 'graphql';

import { compileProgram } from '../data/compileProgram';


const ProgramType = new GraphQLObjectType({
    name: 'ProgramType',
    fields: {
        output: {
            type: GraphQLString
        },
        error: {
            type: GraphQLString,
            resolve: ({ error }) => error
        }
    }
});

const CompileProgramMutation = {
    type: ProgramType,
    description: 'CompileProgram',
    args: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        exercise_id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        code: {
            type: new GraphQLNonNull(GraphQLString)
        },
        attempt: {
            type: GraphQLInt
        }
    },
    resolve: (root, args) => compileProgram(args)
};



export { CompileProgramMutation }
