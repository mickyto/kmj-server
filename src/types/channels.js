import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getChannels, addOrEditChannel, removeChannel } from '../data/channels';
import { OperationType } from './common';

// TODO FIX change channel then add new one will replace previously changed
const ChannelsType = new GraphQLObjectType({
    name: 'Channels',
    fields: {
        channelId: {
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

const QueryChannels = {
    type: new GraphQLList(ChannelsType),
    description: 'Get all channels',
    resolve: () => getChannels()
};

const MutationAddOrEditChannel = {
    type: ChannelsType,
    description: 'Add or remove channel',
    args: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => addOrEditChannel(args)
};

const MutationRemoveChannel = {
    type: OperationType,
    description: 'Remove one channel',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, { id }) => removeChannel(id)
};

export { QueryChannels, MutationAddOrEditChannel, MutationRemoveChannel };
