import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { subjectCrud, getSubjects, removeSubject } from '../data/subject';
import { OperationType } from './common';


const SubjectsType = new GraphQLObjectType({
    name: 'Subjects',
    fields: {
        subjectId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        name: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const MutationRemoveSubject = {
    type: OperationType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeSubject(id)
};

const QuerySubjects = {
    type: new GraphQLList(SubjectsType),
    resolve: () => {
        return getSubjects()
    }
};

const MutationSubjects = {
    type: SubjectsType,
    description: 'Add or remove subject',
    args: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => subjectCrud(args)
};

export { QuerySubjects, MutationSubjects, SubjectsType, MutationRemoveSubject };
