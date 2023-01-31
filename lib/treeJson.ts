import { NormalizedFamilyTree } from '../types/geneology';
import { Endpoints } from './resources/resources.enum';

export const getTreeData = async (): Promise<NormalizedFamilyTree[]> => {
  const url = Endpoints.tree;
  const response = await fetch(url);
  const json = await response.json();
  return json as NormalizedFamilyTree[];
};
