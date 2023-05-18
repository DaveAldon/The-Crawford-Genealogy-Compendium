import React from 'react';
import { Heights } from '../styles/constants.enum';
import { Header } from '../components/Header/Header';
import { GraphTree } from '../components/GraphTree/GraphTree';

const FamilyTree = () => {
  return (
    <div className="flex flex-col h-screen justify-between bg-[#424549]">
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

export default FamilyTree;
