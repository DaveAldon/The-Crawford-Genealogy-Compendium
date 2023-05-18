import React, { useCallback, useEffect } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import initialNodes from '../../compendium/data/people.json';
import initialEdges from '../../compendium/data/edges.json';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { getLayoutedElements } from './GraphUtilities/getLayoutedElements';
import { createGraphLayout } from './GraphUtilities/getElkLayoutedElements';
import { PersonNode } from '../../types/tree';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const getInitialNodes = (): PersonNode[] => {
  return initialNodes.map((node: NormalizedFamilyTree) => {
    return {
      id: node.id,
      data: { ...node, label: node.name },
      position,
      type:
        node.Description === 'marriage-node'
          ? 'marriageGraphNode'
          : 'activeGraphNode',
    };
  });
};
const getInitialEdges = () => {
  return initialEdges.map(edge => {
    return { ...edge, type: edgeType, animated: true };
  });
};

const layoutedEdges = getInitialEdges();
const layoutedNodes = getInitialNodes();

interface UseGraphTreeProps {
  sliderValue: number;
  filterName: string;
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [selectedNode, setSelectedNode] =
    React.useState<NormalizedFamilyTree | null>(null);
  const [nodes, setNodes, _onNodesChange] = useNodesState([]);
  const [edges, setEdges, _onEdgesChange] = useEdgesState(layoutedEdges);
  const [modalVisible, setModalVisible] = React.useState(false);
  const options = { hideAttribution: true };

  useEffect(() => {
    (async () => {
      const elkNodes = await createGraphLayout(layoutedNodes, layoutedEdges);
      setNodes([...elkNodes]);
    })();
  }, []);

  const onNodeClickEvent = useCallback(
    (node: NormalizedFamilyTree) => {
      setSelectedNode(node as NormalizedFamilyTree);
      setModalVisible(true);
    },
    [setSelectedNode],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges(eds => addEdge(params, eds)),
    [setEdges],
  );
  const onLayout = useCallback(
    (direction: string | undefined) => {
      const { nodes: dirLayoutedNodes, edges: dirLayoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...dirLayoutedNodes]);
      setEdges([...dirLayoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges],
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
