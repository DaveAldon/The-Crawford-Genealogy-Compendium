import fs from 'fs';
import { MetaData } from '../types/metadata.d';
import { NormalizedFamilyTree } from '../types/tree.d';

export const writeToFile = async (
  data: MetaData[] | NormalizedFamilyTree[],
  destination: string,
): Promise<void> => {
  await fs.promises.writeFile(destination, JSON.stringify(data, null, 2));
};
