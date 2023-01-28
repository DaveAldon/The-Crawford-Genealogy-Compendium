import { PathsJSON } from '../types/compendium';
import { Endpoints } from './resources/resources.enum';

export const getCompendiumJson = async (): Promise<PathsJSON[]> => {
  const url = Endpoints.compendium;
  const response = await fetch(url);
  const json = await response.json();
  return json as PathsJSON[];
};
