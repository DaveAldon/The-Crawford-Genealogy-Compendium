import * as fs from 'fs';
import { NormalizedFamilyTree } from '../types/genealogy';

export const getTreeJson = (familyName: string) => {
  const jsonString = fs.readFileSync(
    `./public/data/${familyName}.json`,
    'utf-8',
  );
  return JSON.parse(jsonString) as NormalizedFamilyTree[];
};
