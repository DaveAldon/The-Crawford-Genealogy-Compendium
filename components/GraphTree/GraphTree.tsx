'use client';
import React, { useCallback } from 'react';
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
import GraphMarriageNode from './GraphNode/GraphMarriageNode';
import { Controls as GraphControls } from '../Controls/Controls';

const nodeTypes = {
  activeGraphNode: GraphNode,
  marriageGraphNode: GraphMarriageNode,
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

  const fitView = useCallback(() => {
    reactFlowInstance.fitView({ padding: 0.5 });
  }, [reactFlowInstance]);

  const widthSelector = (state: { width: any }) => state.width;
  const heightSelector = (state: { height: any }) => state.height;
  const reactFlowWidth = useStore(widthSelector);
  const reactFlowHeight = useStore(heightSelector);

  const [initialResize, _setInitialResize] = React.useState(false);

  React.useEffect(() => {
    if (!graphTree.searchPerson) return;
    reactFlowInstance.fitView({
      padding: 1,
      maxZoom: 1,
      nodes: [graphTree.searchPerson],
    });
  }, [graphTree.searchPerson]);

  React.useEffect(() => {
    if (initialResize) return;
    setTimeout(() => {
      fitView();
      //setInitialResize(true);
    }, 500);
  }, [reactFlowHeight, reactFlowWidth, fitView, initialResize]);

  if (
    graphTree.nodes === null ||
    graphTree.edges.length === 0 ||
    height === 0 ||
    width === 0
  ) {
    return <></>;
  }

  return (
    <div className="h-full">
      <div className="absolute inset-0 flex z-10 h-fit top-[54px]">
        <GraphControls
          selectedFamily={graphTree.selectedFamily}
          setSelectedFamily={(family: string) => {
            graphTree.setSelectedFamily(family);
            setTimeout(() => {
              fitView();
              //setInitialResize(true);
            }, 500);
          }}
          peopleData={graphTree.nodes}
          person={graphTree.searchPerson}
          setPerson={graphTree.setSearchPerson}
        />
      </div>
      <DemographicsOverlay
        isOpen={graphTree.modalVisible}
        activeNode={graphTree.selectedNode as NormalizedFamilyTree}
        setIsOpen={graphTree.setModalVisible}
        selectedFamily={graphTree.selectedFamily}
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
        minZoom={0.1}
        onNodeClick={(_event, node) => {
          if (
            graphTree.selectedNode?.id !== node.id &&
            !node.id.includes('marriage-node')
          ) {
            graphTree.onNodeClickEvent(node.data as NormalizedFamilyTree);
          }
        }}>
        <MiniMap
          zoomable
          pannable
          className="backdrop-blur-md bg-opacity-30 bg-gray-800 rounded-lg overflow-hidden bg-gray-500/30"
          style={{
            backgroundColor: hext('#808080', 30),
          }}
          ariaLabel="Mini Map"
          maskColor={hext('#808080', 30)}
        />
        <Controls
          onFitView={() => fitView()}
          showInteractive={false}
          className="fill-white"
        />
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
    </div>
  );
};

export const GraphTree = (props: GraphTreeProps) => {
  const [width, height] = useWindowSize();

  return (
    <ReactFlowProvider>
      <div
        style={{
          height: height,
        }}>
        <Flow {...props} />
      </div>
    </ReactFlowProvider>
  );
};
