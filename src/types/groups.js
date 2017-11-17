import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { groupCrud, getGroups, removeGroup } from '../data/groups';
import { TeacherType } from './teachers';
import { getTeacher } from '../data/teachers';
import { OperationType } from './common';

const GroupType = new GraphQLObjectType({
    name: 'Groups',
    fields: {
        groupId: {
            type: GraphQLInt,
            resolve: ({ _id }) => _id
        },
        name: {
            type: GraphQLString,
        },
        teacher: {
            type: TeacherType,
            resolve: ({ teacherId }) => getTeacher(teacherId)
        },
        error: {
            type: GraphQLString,
        }
    }
});

const MutationRemoveGroup = {
    type: OperationType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeGroup(id)
};

const QueryGroups = {
    type: new GraphQLList(GroupType),
    resolve: () => {
        return getGroups()
    }
};

const MutationGroups = {
    type: GroupType,
    description: 'Add or remove Group',
    args: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        teacherId: {
            type: GraphQLInt
        }
    },
    resolve: (root, args) => {
        console.log(args)
        return groupCrud(args)
    }
};

export { QueryGroups, MutationGroups, GroupType, MutationRemoveGroup };
