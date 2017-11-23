import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getTeachers, getTeacher, addOrEditTeacher, removeTeacher } from '../data/teachers';
import { OperationType } from './common';


const TeacherType = new GraphQLObjectType({
    name: 'Teachers',
    fields: {
        teacherId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        fio: {
            type: GraphQLString,
        },
        phone: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLString,
        },
        education: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryTeachers = {
    type: new GraphQLList(TeacherType),
    description: 'Get all teachers',
    resolve: () => getTeachers()
};

const QueryTeacher = {
    type: TeacherType,
    description: 'Get one teacher',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getTeacher(id)
};

const MutationAddOrEditTeacher = {
    type: TeacherType,
    description: 'Edit or add new client',
    args: {
        id: {
            type: GraphQLInt
        },
        fio: {
            type: new GraphQLNonNull(GraphQLString)
        },
        phone: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        age: {
            type: GraphQLString,
        },
        education: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    },
    resolve: (root, args) => addOrEditTeacher(args)
};

const MutationRemoveTeacher = {
    type: OperationType,
    description: 'Remove teacher',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeTeacher(id)
};

export { TeacherType, QueryTeachers, QueryTeacher, MutationAddOrEditTeacher, MutationRemoveTeacher };
