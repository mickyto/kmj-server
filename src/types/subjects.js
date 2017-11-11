import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';
import { subjectCrud, getSubjects } from '../data/subject';


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

export { QuerySubjects, MutationSubjects };
