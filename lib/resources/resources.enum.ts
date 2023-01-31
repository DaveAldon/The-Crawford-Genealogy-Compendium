export enum Endpoints {
  github = 'https://github.com/DaveAldon/Genealogy-Compendium-Resources/blob/master/resources/individuals/',
  artifacts = 'https://raw.githubusercontent.com/DaveAldon/Genealogy-Compendium-Resources/master/data/artifacts.json',
  tree = 'https://raw.githubusercontent.com/DaveAldon/Genealogy-Compendium-Resources/master/data/people.json',
}

export enum ResourceTypes {
  profile = '/profile.png?raw=true',
}

export enum FallbackResources {
  profileMale = '/man.png',
  profileFemale = '/woman.png',
}
