import React from 'react';
import { Tree } from './FamilyTree/components/Tree/Tree';
import { NormalizedFamilyTree } from '../types/genealogy';
import { useFamilyTree } from './FamilyTree/useFamilyTree/useFamilyTree';
import { defaultAPIFamilyTree } from '../utils/defaultData';
import { Heights } from '../styles/constants.enum';
import { DemographicsOverlay } from '../components/DemographicsOverlay/DemographicsOverlay';
import { Header } from '../components/Header/Header';
import { getTreeData } from '../lib/treeJson';
import { GraphTree } from '../components/GraphTree/GraphTree';

const TreeExperiment = ({ data }: { data: NormalizedFamilyTree[] }) => {
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
        <GraphTree sliderValue={10} fitViewToggle={true} filterName="" />
      </div>
    </div>
  );
};

export const getServerSideProps = (_context: any) => {
  const people = getTreeData();

  return {
    props: {
      data: people,
    },
  };
};

export default TreeExperiment;
