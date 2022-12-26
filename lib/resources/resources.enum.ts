export enum Endpoints {
  github = 'https://github.com/DaveAldon/Genealogy-Compendium-Resources/blob/master/resources/individuals/',
}

export enum ResourceTypes {
  profile = '/profile.png?raw=true',
}

export const getGalleryUrl = (index: number) => {
  return `/gallery${index}.jpg?raw=true`;
};

export enum FallbackResources {
  profile = 'https://i.pravatar.cc/150?u=',
}
