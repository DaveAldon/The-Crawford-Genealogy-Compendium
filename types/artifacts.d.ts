export interface Artifact {
  mimeType: string;
  thumbnailLink: string;
  link: string;
  name: string;
  id: string;
  description: string;
  imageMediaMetadata: any;
}
export enum ArtifactType {
  videos = 'videos',
  photos = 'photos',
  profile = 'profile',
  miscellaneous = 'miscellaneous',
  artifacts = 'artifacts',
  military = 'military',
}
export interface Artifacts {
  videos: Artifact[];
  photos: Artifact[];
  profile: Artifact[];
  miscellaneous: Artifact[];
  artifacts: Artifact[];
  military: Artifact[];
  ownerId?: string;
}
