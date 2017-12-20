import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import { getItems, getItem, setItem, removeItem } from '../data/Items';
import { OperationType } from './common';


const ItemType = new GraphQLObjectType({
    name: 'Items',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        }
    })
});

const QueryItems = {
    type: new GraphQLList(ItemType),
    description: 'Get all items',
    args: {
        kind: {
            type: GraphQLString
        }
    },
    resolve: (root, { kind }) => getItems(kind)
};

const QueryItem = {
    type: ItemType,
    description: 'Get one Item',
    args: {
        id: {
            type: GraphQLInt
        },
        kind: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => getItem(args)
};

const MutationSetItem = {
    type: ItemType,
    description: 'Add or remove item',
    args: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        kind: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => setItem(args)
};

const MutationRemoveItem = {
    type: OperationType,
    description: 'Remove one item',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        kind: {
            type: GraphQLString
        }
    },
    resolve: (root, args) => removeItem(args)
};

export { ItemType, QueryItem, QueryItems, MutationSetItem, MutationRemoveItem };


