import { MetaData } from './metadata';

export interface APIFamilyTree {
  _id: string;
  id: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
  Gender: string;
  DOB: string;
  Birthplace: string;
  BirthplaceCoords: string;
  Death: string;
  Deathplace: string;
  DeathplaceCoords: string;
  Mother: string;
  Father: string;
  Spouse: string;
  Divorced: string;
  Description: string;
}

export interface NormalizedFamilyTree extends APIFamilyTree {
  id: string;
  name: string;
  gender: Gender;
  parents: Relation[];
  children: Relation[];
  siblings: Relation[];
  spouses: Relation[];
  placeholder?: boolean;
  metadata: MetaData;
}

export const enum Gender {
  male = 'male',
  female = 'female',
}

export const enum RelType {
  blood = 'blood',
  married = 'married',
  divorced = 'divorced',
  adopted = 'adopted',
  half = 'half',
}
