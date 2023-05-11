import fs from 'fs';
import { NormalizedFamilyTree } from '../types/tree.d';

export const writeToFile = async (
  data: NormalizedFamilyTree[],
  destination: string,
): Promise<void> => {
  await fs.promises.writeFile(destination, JSON.stringify(data, null, 2));
};
