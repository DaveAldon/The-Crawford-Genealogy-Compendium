import path from 'path';
import { NormalizedFamilyTree } from '../types/genealogy';
import fsPromises from 'fs/promises';

export const getTreeData = async (): Promise<NormalizedFamilyTree[]> => {
  // get json file in public/data/people.json
  const filePath = path.join(process.cwd(), 'compendium/data/people.json');
  const json = await fsPromises.readFile(filePath, 'utf8');
  const objectData = JSON.parse(json);
  return objectData as NormalizedFamilyTree[];
};
