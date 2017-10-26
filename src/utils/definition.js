import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLInt
} from 'graphql';

export const connectionDefinitions = config => {

    const nodeType = config.nodeType;
    const name = config.name || nodeType.name;
    const resolveNode = config.resolveNode;
    
    const edgeType = new GraphQLObjectType({
        name: name + 'Edge',
        fields: () => ({
            node: {
                type: nodeType,
                resolve: resolveNode
            }
        })
    });

    const connectionType = new GraphQLObjectType({
        name: name + 'Connection',
        fields: () => ({
            edges: {
                type: new GraphQLList(edgeType)
            },
            pages: {
                type: new GraphQLList(pageType)
            },
            total: {
                type: GraphQLInt
            }
        })
    });

    return { edgeType: edgeType, connectionType: connectionType };
};

const pageType = new GraphQLObjectType({
    name: 'Pages',
    fields: () => ({
        number: {
            type: GraphQLInt
        }
    })
});
