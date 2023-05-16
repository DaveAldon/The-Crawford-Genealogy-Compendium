import { NormalizedFamilyTree } from '../types/genealogy';
import json from '../compendium/data/people.json';

export const getTreeData = (): NormalizedFamilyTree[] => {
  return json as NormalizedFamilyTree[];
};
