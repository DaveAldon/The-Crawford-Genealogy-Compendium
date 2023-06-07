import { APIFamilyTree } from '../types/genealogy';
import { getFamilyData } from './lib/googlesheets';

export const getFamilyTree = async (familySheet: string) => {
  const people: APIFamilyTree[] = await getFamilyData(familySheet);
  return { people };
};
