import { NormalizedFamilyTree } from '../types/genealogy';

export const getTreeJsonClient = async (familyName: string) => {
  const nodeResponse = await fetch(`/data/${familyName}.json`);
  const nodeData = (await nodeResponse.json()) as NormalizedFamilyTree[];
  return nodeData;
};
