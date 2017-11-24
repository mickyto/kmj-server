import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} from 'graphql';

import { TeacherType } from './teachers';
import { SubjectType } from './subjects';
import { FormatType } from './formats';
import { OperationType } from './common';
import { getGroups, getGroup, addOrEditGroup, removeGroup } from '../data/groups';
import { getSubject } from '../data/subjects';
import { getTeacher } from '../data/teachers';
import { getFormat } from '../data/formats';

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
        groupId: {
            type: GraphQLInt,
            resolve: ({ id }) => id
        },
        title: {
            type: GraphQLString,
        },
        subject: {
            type: SubjectType,
            resolve: ({ subject_id }) => getSubject(subject_id)
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
            resolve: ({ format_id }) => getFormat(format_id)
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
    resolve: (root, args) => {
        console.log(args)
        return addOrEditGroup(args)
    }
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
