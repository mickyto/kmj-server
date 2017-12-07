import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getWorks, addOrEditWork, removeWork, getWork, getWorkExercises, getWorkPupils } from '../data/works';
import { IdType, OperationType } from './common';
import { ProgExerciseType } from './progExercises';
import { PupilType } from './pupils';



const WorkType = new GraphQLObjectType({
    name: 'Works',
    fields: {
        workId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString
        },
        exercises: {
            type: new GraphQLList(ProgExerciseType),
            resolve: ({ id }) => getWorkExercises(id)
        },
        pupils: {
            type: new GraphQLList(PupilType),
            resolve: ({ id }) => getWorkPupils(id)
        },
        error: {
            type: GraphQLString,
        }
    }
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
    description: 'Get all works',
    resolve: () => getWorks()
};

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
        exercises: {
            type: new GraphQLList(GraphQLInt),
        },
        pupils: {
            type: new GraphQLList(GraphQLInt),
        }/*,
        sort: {
            type: GraphQLInt
        }*/
    },
    resolve: (root, args) => addOrEditWork(args)
};

const MutationRemoveWork = {
    type: OperationType,
    description: 'Remove one work',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeWork(id)
};

export { WorkType, QueryWorks, QueryWork, MutationAddOrEditWork, MutationRemoveWork };
