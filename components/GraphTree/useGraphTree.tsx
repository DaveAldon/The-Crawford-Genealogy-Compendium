import React, { useCallback, useEffect } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
//import './index.css';
import initialNodes from '../../compendium/data/people.json';
import initialEdges from '../../compendium/data/edges.json';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { getLayoutedElements } from './GraphUtilities/getLayoutedElements';
import { createGraphLayout } from './GraphUtilities/getElkLayoutedElements';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';
const getInitialNodes = () => {
  return initialNodes.map(node => {
    return {
      id: node.id,
      data: { ...node, label: node.name },
      position,
      type:
        node.Description === 'marriage-node'
          ? 'marriageGraphNode'
          : 'activeGraphNode',
      //sourcePosition: 'right',
      //targetPosition: 'left',
    };
  });
};
const getInitialEdges = () => {
  return initialEdges.map(edge => {
    return { ...edge, type: edgeType, animated: true };
  });
};

/* const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  getInitialNodes(),
  getInitialEdges(),
); */
const layoutedEdges = getInitialEdges();

interface UseGraphTreeProps {
  sliderValue: number;
  filterName: string;
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [selectedNode, setSelectedNode] =
    React.useState<NormalizedFamilyTree | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [modalVisible, setModalVisible] = React.useState(false);
  const options = { hideAttribution: true };

  useEffect(() => {
    (async () => {
      const layoutedNodes = await createGraphLayout(
        getInitialNodes(),
        getInitialEdges(),
      );
      setNodes([...layoutedNodes]);
      //console.log('nodes', nodes);
    })();
  }, []);

  const onNodeClickEvent = useCallback(
    (node: NormalizedFamilyTree) => {
      setSelectedNode(node as NormalizedFamilyTree);
      //setModalVisible(true)
    },
    [setSelectedNode],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges(eds => addEdge(params, eds)),
    [],
  );
  const onLayout = useCallback(
    (direction: string | undefined) => {
      const { nodes: dirLayoutedNodes, edges: dirLayoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...dirLayoutedNodes]);
      setEdges([...dirLayoutedEdges]);
    },
    [nodes, edges],
  );

  return {
    nodes,
    edges,
    onConnect,
    onLayout,
    options,
    onNodeClickEvent,
    modalVisible,
    setModalVisible,
    selectedNode,
  };
};
