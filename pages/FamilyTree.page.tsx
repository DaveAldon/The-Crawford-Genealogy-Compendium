import React from 'react';
import { Tree } from './FamilyTree/components/Tree/Tree';
import { NormalizedFamilyTree } from '../types/genealogy';
import { useFamilyTree } from './FamilyTree/useFamilyTree/useFamilyTree';
import { defaultAPIFamilyTree } from '../utils/defaultData';
import { Heights } from '../styles/constants.enum';
import { DemographicsOverlay } from '../components/DemographicsOverlay/DemographicsOverlay';
import { Header } from '../components/Header/Header';
import { getTreeData } from '../lib/treeJson';

const FamilyTree = ({ data }: { data: NormalizedFamilyTree[] }) => {
  const {
    nodes,
    rootId,
    setRootId,
    onClickNode,
    panelState,
    setPanelState,
    activeNode,
  } = useFamilyTree({ data });

  return (
    <div className="flex flex-col h-screen justify-between bg-[#424549]">
      <DemographicsOverlay
        isOpen={panelState}
        activeNode={
          data.find(item => item.id === activeNode) || defaultAPIFamilyTree
        }
        setIsOpen={setPanelState}
      />
      <Header />
      <div
        style={{
          height: Heights.CONTENT,
          position: 'absolute',
          bottom: 0,
          top: 54,
          width: '100%',
        }}>
        {nodes.length > 0 && (
          <Tree
            data={data}
            nodes={nodes}
            rootId={rootId}
            setRootId={setRootId}
            onClickNode={onClickNode}
            setPanelState={setPanelState}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (_context: any) => {
  const people = await getTreeData();

  return {
    props: {
      data: people,
    },
  };
};

export default FamilyTree;
