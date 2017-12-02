import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import { compileProgram } from '../data/compileProgram';


const ProgramType = new GraphQLObjectType({
    name: 'ProgramType',
    fields: {
        output: {
            type: GraphQLString
        },
        error: {
            type: GraphQLString
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
        code: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, { code }) => compileProgram(code)
};



export { CompileProgramMutation }
