import { Endpoints } from './resources.enum';

export const getMilitaryImage = (name: string) => {
  return `${Endpoints.military}${name}?raw=true`;
};
