import React from 'react';
import { Heights } from '../styles/constants.enum';
import { Header } from '../components/Header/Header';
import { GraphTree } from '../components/GraphTree/GraphTree';

const FamilyTree = () => {
  return (
    <div className="flex flex-col  justify-between bg-[#424549]">
      <Header />
      <GraphTree sliderValue={10} fitViewToggle={true} filterName="" />
    </div>
  );
};

export default FamilyTree;
