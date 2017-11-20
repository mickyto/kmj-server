import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import { TeacherType } from './teachers';
import { SubjectType } from './subjects';
import { FormatType } from './formats';
import { OperationType } from './common';
import { getGroups, getGroup, addOrEditGroup, removeGroup } from '../data/groups';
import { getSubject } from '../data/subjects';
import { getTeacher } from '../data/teachers';
import { getFormat } from '../data/formats';

const GroupType = new GraphQLObjectType({
    name: 'Groups',
    fields: {
        groupId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        title: {
            type: GraphQLString,
        },
        subject: {
            type: SubjectType,
            resolve: ({ subject }) => getSubject(subject)
        },
        dayOfWeek: {
            type: new GraphQLList(GraphQLString),
        },
        teacher: {
            type: TeacherType,
            resolve: ({ teacher }) => getTeacher(teacher)
        },
        time: {
            type: GraphQLString,
        },
        format: {
            type: FormatType,
            resolve: ({ format }) => getFormat(format)
        },
        error: {
            type: GraphQLString,
        }
    }
});

const QueryGroups = {
    type: new GraphQLList(GroupType),
    description: 'Get all groups',
    resolve: () => getGroups()
};

const QueryGroup= {
    type: GroupType,
    description: 'Get one group',
    args: {
        id: {
            type: GraphQLInt
        }
    },
    resolve: (root, { id }) => getGroup(id)
};

const MutationAddOrEditGroup = {
    type: GroupType,
    description: 'Edit or add new group',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        subject: {
            type: GraphQLInt,
        },
        dayOfWeek: {
            type: new GraphQLList(GraphQLString),
        },
        teacher: {
            type: GraphQLInt,
        },
        time: {
            type: GraphQLString,
        },
        format: {
            type: GraphQLInt,
        },
    },
    resolve: (root, args) => addOrEditGroup(args)
};

const MutationRemoveGroup = {
    type: OperationType,
    description: 'Remove one group',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeGroup(id)
};

export { GroupType, QueryGroups, QueryGroup, MutationAddOrEditGroup, MutationRemoveGroup };
