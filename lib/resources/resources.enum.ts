export enum Endpoints {
  github = 'https://github.com/DaveAldon/Genealogy-Compendium-Resources/blob/master/resources/individuals/',
}

export enum ResourceTypes {
  profile = '/profile.png?raw=true',
}

export const getGalleryUrl = (index: number, extension: string) => {
  return `/gallery${index}.${extension}?raw=true`;
};

export const getVideoUrl = (index: number, extension: string) => {
  return `/video${index}.${extension}?raw=true`;
};

export const getArtifactUrl = (index: number, extension: string) => {
  return `/artifact${index}.${extension}?raw=true`;
};

export enum FallbackResources {
  profileMale = '/man.png',
  profileFemale = '/woman.png',
}
