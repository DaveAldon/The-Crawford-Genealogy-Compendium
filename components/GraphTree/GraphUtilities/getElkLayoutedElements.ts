import Elk, { ElkNode, ElkExtendedEdge } from 'elkjs';
import { Node, Edge } from 'react-flow-renderer';

/* From https://github.com/wbkd/react-flow/issues/5#issuecomment-954001434 */
/* 
Get a sense of the parameters at:
https://rtsys.informatik.uni-kiel.de/elklive/examples.html?e=general%2Fspacing%2FnodesEdges 
*/

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 250;
const DEFAULT_WIDTH_FOR_ROOT = 250;

const elk = new Elk({
  defaultLayoutOptions: {
    'org.eclipse.elk.algorithm': 'layered',
    'org.eclipse.elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
    'org.eclipse.elk.direction': 'DOWN',
    'org.eclipse.elk.layered.layering.strategy': 'NETWORK_SIMPLEX',
    'org.eclipse.elk.layered.nodePlacement.strategy': 'NETWORK_SIMPLEX',
    'org.eclipse.elk.layered.nodePlacement.favorStraightEdges': 'true',
    'elk.layered.mergeEdges': 'true',
    'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
    'elk.edgeRouting': 'SPLINES',
    'org.eclipse.elk.contentAlignment': 'V_CENTER',
    //'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
  },
});

export const createGraphLayout = async (
  nodes: Array<Node>,
  edges: Array<Edge>,
): Promise<Array<Node>> => {
  const elkNodes: ElkNode[] = [];
  const elkEdges: ElkExtendedEdge[] = [];

  nodes.forEach(flowNode => {
    elkNodes.push({
      id: flowNode.id,
      width:
        flowNode.id === '0'
          ? DEFAULT_WIDTH_FOR_ROOT
          : flowNode.width ?? DEFAULT_WIDTH,
      height: flowNode.height ?? DEFAULT_HEIGHT,
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
