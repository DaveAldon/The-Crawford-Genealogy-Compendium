import * as fs from 'fs';
import { NormalizedFamilyTree } from '../types/genealogy';

export const getJson = (familyName: string) => {
  const jsonString = fs.readFileSync(`/data/${familyName}.json`, 'utf-8');
  return JSON.parse(jsonString) as NormalizedFamilyTree[];
};
