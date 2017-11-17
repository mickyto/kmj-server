import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';
import { teacherCrud, getTeachers, getTeacher } from '../data/teachers';
import { getSubjects } from '../data/subjects';
import { SubjectType } from './subjects';
import { IdType } from './common';

const TeacherType = new GraphQLObjectType({
    name: 'Teachers',
    fields: {
        teacherId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
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
        subjects: {
            type: new GraphQLList(SubjectType),
            resolve: ({ subjects }) => getSubjects(subjects.ids)
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryTeachers = {
    type: new GraphQLList(TeacherType),
    resolve: () => {
        return getTeachers()
    }
};

const QueryTeacher = {
    type: TeacherType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getTeacher(id)
};

const MutationTeachers = {
    type: TeacherType,
    description: 'Alter subjects',
    args: {
        id: {
            type: GraphQLInt
        },
        fio: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        subjects: {
            type: new GraphQLList(IdType),
        },
    },
    resolve: (root, args) => teacherCrud(args)
};

export { QueryTeachers, MutationTeachers, TeacherType, QueryTeacher };
