export interface PathsJSON {
  guid: string;
  name: string;
  resources: {
    url: string;
    height: number;
    width: number;
    type: 'video' | 'photo' | 'artifact';
    description: string;
  }[];
}
