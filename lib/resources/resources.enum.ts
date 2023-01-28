export enum Endpoints {
  github = 'https://github.com/DaveAldon/Genealogy-Compendium-Resources/blob/master/resources/individuals/',
  compendium = 'https://raw.githubusercontent.com/DaveAldon/Genealogy-Compendium-Resources/master/resources/paths.json',
}

export enum GoogleSheetIds {
  People = '0',
  Photos = '567744909',
  Artifacts = '866666862',
  Movies = '1671354690',
}

export enum ResourceTypes {
  profile = '/profile.png?raw=true',
}

export const getSheetUrl = (sheet: GoogleSheetIds, query: string) => {
  return `https://spreadsheets.google.com/tq?key=${process.env.SPREADSHEET_ID}&gid=${sheet}&tq=${query}`;
};

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
