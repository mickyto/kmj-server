import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql';

import { TeacherType } from './teachers';
import { ItemType } from './items';
import { FormatType } from './formats';
import { getGroups, getGroup, addOrEditGroup } from '../data/groups';
import { getTeacher } from '../data/teachers';
import { getItem } from '../data/items';

const DayInputType = new GraphQLInputObjectType({
    name: 'DayInput',
    fields: {
        day: {
            type: GraphQLString,
        },
        time: {
            type: GraphQLString,
        }
    }
});

const DayOutputType = new GraphQLObjectType({
    name: 'DayOutput',
    fields: {
        day: {
            type: GraphQLString,
        },
        time: {
            type: GraphQLString,
        }
    }
});

const GroupType = new GraphQLObjectType({
    name: 'Groups',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        subject: {
            type: ItemType,
            resolve: ({ subject_id }) => getItem({ id: subject_id, kind: 'subjects' })
        },
        daysOfWeek: {
            type: new GraphQLList(DayOutputType),
        },
        teacher: {
            type: TeacherType,
            resolve: ({ teacher_id }) => getTeacher(teacher_id)
        },
        format: {
            type: FormatType,
            resolve: ({ format_id }) => getItem({ id: format_id, kind: 'formats' })
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
        subject_id: {
            type: GraphQLInt,
        },
        daysOfWeek: {
            type: new GraphQLList(DayInputType),
        },
        teacher_id: {
            type: GraphQLInt,
        },
        format_id: {
            type: GraphQLInt,
        },
    },
    resolve: (root, args) => addOrEditGroup(args)
};

export { GroupType, QueryGroups, QueryGroup, MutationAddOrEditGroup };
