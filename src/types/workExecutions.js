import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';
import { getPupil } from '../data/pupils';
import { PupilType } from './pupils';


const WorkExecutionsType = new GraphQLObjectType({
    name: 'WorkExecutions',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        pupil: {
            type: PupilType,
            resolve: ({ pupil_id }) => getPupil(pupil_id)
        },
        exercise_id: {
            type: GraphQLInt
        },
        program: {
            type: GraphQLString,
        },
        attempt: {
            type: GraphQLInt,
        },
        status: {
            type: GraphQLInt
        },
        date: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    })
});

export { WorkExecutionsType };
