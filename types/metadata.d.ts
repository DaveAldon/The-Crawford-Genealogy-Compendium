import { FileType } from '../enums/files.enum';

export interface MetaData {
  guid: string;
  profile: string;
  resources: APIArtifact[];
  military?: Military;
}

export interface APIArtifact {
  url: string;
  height: number;
  width: number;
  type: FileType;
  description: string;
}

export interface Military {
  id: string;
  branch: string;
  rank: string;
  start: string;
  end: string;
  description: string;
  awards: string[];
  theater: string;
}
