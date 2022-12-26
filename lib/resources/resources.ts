import { Endpoints, ResourceTypes } from './resources.enum';

export const getResource = (
  guid: string,
  resource: ResourceTypes | string,
): string => {
  return `${Endpoints.github}${guid}${resource}`;
};
