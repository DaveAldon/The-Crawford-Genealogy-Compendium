import { MetaData } from './metadata';
import { Artifacts } from './artifacts';
import { NormalizedFamilyTree } from './genealogy';
import { Edge } from 'reactflow';

export interface Tree {
  nodes: PersonNode[];
  edges: Edge[];
}

export interface PersonNode {
  id: string;
  data: NormalizedFamilyTree;
  position: {
    x: number;
    y: number;
  };
  style?: {
    [key: string]: string;
  };
}

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum RelType {
  blood = 'blood',
  married = 'married',
  divorced = 'divorced',
  adopted = 'adopted',
  half = 'half',
}
