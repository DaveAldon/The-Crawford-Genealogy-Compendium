import { Artifacts } from './artifacts';
import { PathsJSON } from './compendium';

export interface APIFamilyTree {
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

export interface Military {
  id: string;
  branch: string;
  rank: string;
  start: string;
  end: string;
  description: string;
  awards: string;
  theater: string;
}

export interface Relation {
  id: string;
  relType: string;
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
  metadata: Artifacts;
  military?: Military;
}
