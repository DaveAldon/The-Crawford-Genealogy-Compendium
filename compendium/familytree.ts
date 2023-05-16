import { APIFamilyTree } from '../types/genealogy';
import { getPeopleData } from './lib/googlesheets';

export const getFamilyTree = async () => {
  const people: APIFamilyTree[] = await getPeopleData();
  return { people };
};
