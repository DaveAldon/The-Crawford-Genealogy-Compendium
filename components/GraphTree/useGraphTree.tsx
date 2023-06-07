import React, { useCallback, useEffect } from 'react';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { createGraphLayout } from './GraphUtilities/getElkLayoutedElements';
import { PersonNode } from '../../types/tree';
import { families } from '../../compendium/lib/families';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const getInitialNodes = (nodes: NormalizedFamilyTree[]): PersonNode[] => {
  return nodes.map((node: NormalizedFamilyTree) => {
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
const getInitialEdges = (edges: Edge[]) => {
  return edges.map(edge => {
    return { ...edge, type: edgeType, animated: true };
  });
};

interface UseGraphTreeProps {
  sliderValue: number;
  filterName: string;
}
export const useGraphTree = (props: UseGraphTreeProps) => {
  const [selectedFamily, setSelectedFamily] = React.useState<string>(
    families[0],
  );
  const [selectedNode, setSelectedNode] =
    React.useState<NormalizedFamilyTree | null>(null);
  const [nodes, setNodes, _onNodesChange] = useNodesState([]);
  const [edges, setEdges, _onEdgesChange] = useEdgesState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const options = { hideAttribution: true };

  const [searchPerson, setSearchPerson] = React.useState<Node | null>(null);

  useEffect(() => {
    (async () => {
      const nodeResponse = await fetch(`data/${selectedFamily}.json`);
      const nodeData = (await nodeResponse.json()) as NormalizedFamilyTree[];
      const initialNodes = getInitialNodes(nodeData);

      const edegeResponse = await fetch(`data/${selectedFamily}-edges.json`);
      const edgeData = (await edegeResponse.json()) as Edge[];
      const initialEdges = getInitialEdges(edgeData);
      setEdges([...initialEdges]);

      const elkNodes = await createGraphLayout(initialNodes, initialEdges);
      setNodes([...elkNodes]);
    })();
  }, [selectedFamily]);

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

  return {
    nodes,
    edges,
    onConnect,
    options,
    onNodeClickEvent,
    modalVisible,
    setModalVisible,
    selectedNode,
    selectedFamily,
    setSelectedFamily,
    searchPerson,
    setSearchPerson,
  };
};
