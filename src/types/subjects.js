import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getSubjects, addOrEditSubject, removeSubject } from '../data/subjects';
import { OperationType } from './common';


const SubjectType = new GraphQLObjectType({
    name: 'Subjects',
    fields: {
        subjectId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        name: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QuerySubjects = {
    type: new GraphQLList(SubjectType),
    description: 'Get all subjects',
    resolve: () => getSubjects()
};

const MutationAddOrEditSubject = {
    type: SubjectType,
    description: 'Add or remove subject',
    args: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addOrEditSubject(args)
};

const MutationRemoveSubject = {
    type: OperationType,
    description: 'Remove one subject',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeSubject(id)
};

export { SubjectType, QuerySubjects, MutationAddOrEditSubject, MutationRemoveSubject };
