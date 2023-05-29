import Elk, { ElkNode, ElkExtendedEdge } from 'elkjs';
import { Node, Edge } from 'react-flow-renderer';
import { PersonNode } from '../../../types/tree';

const PERSON_NODE_WIDTH = 125;
const PERSON_NODE_HEIGHT = 225;
const MARRIAGE_NODE_WIDTH = 125;
const MARRIAGE_NODE_HEIGHT = 225;

const elk = new Elk({
  defaultLayoutOptions: {
    'org.eclipse.elk.algorithm': 'layered',
    'org.eclipse.elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
    'org.eclipse.elk.direction': 'DOWN',
    'org.eclipse.elk.layered.layering.strategy': 'NETWORK_SIMPLEX',
    'org.eclipse.elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'org.eclipse.elk.layered.nodePlacement.favorStraightEdges': 'true',
    //'elk.layered.mergeEdges': 'true',
    //'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
    'elk.edgeRouting': 'SPLINES',
    //'org.eclipse.elk.contentAlignment': 'V_CENTER',
    //'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
  },
});

export const createGraphLayout = async (
  nodes: PersonNode[],
  edges: Edge[],
): Promise<Node[]> => {
  const elkNodes: ElkNode[] = [];
  const elkEdges: ElkExtendedEdge[] = [];

  nodes.forEach(flowNode => {
    elkNodes.push({
      id: flowNode.id,
      width:
        flowNode.data.Description === 'marriage-node'
          ? MARRIAGE_NODE_WIDTH
          : PERSON_NODE_WIDTH,
      height:
        flowNode.data.Description === 'marriage-node'
          ? MARRIAGE_NODE_HEIGHT
          : PERSON_NODE_HEIGHT,
    });
  });
  edges.forEach(flowEdge => {
    elkEdges.push({
      id: flowEdge.id,
      targets: [flowEdge.target],
      sources: [flowEdge.source],
    });
  });

  const newGraph = await elk.layout({
    id: 'root',
    children: elkNodes,
    edges: elkEdges,
  });
  return nodes.map(flowNode => {
    const node = newGraph?.children?.find(n => n.id === flowNode.id);
    if (node?.x && node?.y && node?.width && node?.height) {
      flowNode.position = {
        x: node.x - node.width / 2 + Math.random() / 1000,
        y: node.y - node.height / 2,
      };
    }
    return flowNode;
  });
};
