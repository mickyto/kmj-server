import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';
import { teacherCrud, getTeachers, getTeacher } from '../data/teachers';
import { getSubjects } from '../data/subjects';
import { SubjectsType } from './subjects';
import { IdsType } from './common';

const TeachersType = new GraphQLObjectType({
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
            type: new GraphQLList(SubjectsType),
            resolve: ({ subjects }) => getSubjects(subjects.ids)
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryTeachers = {
    type: new GraphQLList(TeachersType),
    resolve: () => {
        return getTeachers()
    }
};

const QueryTeacher = {
    type: TeachersType,
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getTeacher(id)
};

const MutationTeachers = {
    type: TeachersType,
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
            type: IdsType,
        },
    },
    resolve: (root, args) => teacherCrud(args)
};

export { QueryTeachers, MutationTeachers, TeachersType, QueryTeacher };
