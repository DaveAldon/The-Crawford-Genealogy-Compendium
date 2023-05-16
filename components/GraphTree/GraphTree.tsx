'use client';
import React from 'react';
import ReactFlow, {
  ConnectionLineType,
  ConnectionMode,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  useStore,
} from 'reactflow';
import { useGraphTree } from './useGraphTree';
import { hext } from '@davealdon/hext';
import './node.module.css';
import { useWindowSize } from '../../hooks/useWindowSize';
import { DemographicsOverlay } from '../DemographicsOverlay/DemographicsOverlay';
import { NormalizedFamilyTree } from '../../types/genealogy';
import GraphNode from './GraphNode/GraphNode';

const nodeTypes = {
  activeGraphNode: GraphNode,
};

interface GraphTreeProps {
  sliderValue: number;
  filterName: string;
  fitViewToggle: boolean;
}
const Flow = (props: GraphTreeProps) => {
  const reactFlowInstance = useReactFlow();
  const [width, height] = useWindowSize();
  const graphTree = useGraphTree(props);

  const fitView = () => {
    reactFlowInstance.fitView({ padding: 1 });
  };

  const widthSelector = (state: { width: any }) => state.width;
  const heightSelector = (state: { height: any }) => state.height;
  const reactFlowWidth = useStore(widthSelector);
  const reactFlowHeight = useStore(heightSelector);

  React.useEffect(() => {
    if (!props.fitViewToggle) return;
    setTimeout(() => {
      fitView();
    }, 100);
  }, [reactFlowWidth, reactFlowHeight, reactFlowInstance, props.sliderValue]);

  if (
    graphTree.nodes === null ||
    graphTree.edges.length === 0 ||
    height === 0 ||
    width === 0
  ) {
    return <></>;
  }

  return (
    <>
      <DemographicsOverlay
        isOpen={graphTree.modalVisible}
        activeNode={graphTree.selectedNode as NormalizedFamilyTree}
        setIsOpen={graphTree.setModalVisible}
      />
      <ReactFlow
        nodes={graphTree.nodes}
        edges={graphTree.edges}
        proOptions={graphTree.options}
        onConnect={graphTree.onConnect}
        nodesDraggable={false}
        connectionMode={ConnectionMode.Strict}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.Straight}
        minZoom={0.2}
        onNodeClick={(_event, node) => {
          if (graphTree.selectedNode?.id !== node.id) {
            graphTree.onNodeClickEvent(node.data as NormalizedFamilyTree);
          }
        }}
        /* onPaneClick={() => {
          graphTree.resetNodes();
        }} */
        onInit={() => {
          setTimeout(() => {
            fitView();
          }, 1);
        }}>
        <MiniMap
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: hext('#808080', 30),
          }}
        />
        <Controls onFitView={() => fitView()} showInteractive={false} />
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto">
              <circle
                stroke="#2a8af6"
                strokeOpacity="0.75"
                r="2"
                cx="0"
                cy="0"
              />
            </marker>
          </defs>
        </svg>
      </ReactFlow>
    </>
  );
};

export const GraphTree = (props: GraphTreeProps) => {
  const [width, height] = useWindowSize();

  return (
    <ReactFlowProvider>
      <div
        style={{
          height: height - 68,
          width,
        }}>
        <Flow {...props} />
      </div>
    </ReactFlowProvider>
  );
};