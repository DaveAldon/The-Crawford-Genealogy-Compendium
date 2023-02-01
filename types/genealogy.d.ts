import { PathsJSON } from './compendium';

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

export interface APIArtifact {
  id: string;
  description: string;
  type: string;
  url: string;
  height: number;
  width: number;
}

export interface MetaData {
  guid: string;
  name: string;
  profile: string;
  resources: APIArtifact[];
  military?: Military;
}

export interface Military {
  id: string;
  branch: string;
  rank: string;
  start: string;
  end: string;
  description: string;
  awards: string;
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
