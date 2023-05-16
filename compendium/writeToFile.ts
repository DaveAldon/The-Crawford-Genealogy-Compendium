import fs from 'fs';
import { NormalizedFamilyTree } from '../types/genealogy';
import { Edge } from 'reactflow';

export const writeToFile = async (
  data: NormalizedFamilyTree[] | Edge[],
  destination: string,
): Promise<void> => {
  await fs.promises.writeFile(destination, JSON.stringify(data, null, 2));
};
