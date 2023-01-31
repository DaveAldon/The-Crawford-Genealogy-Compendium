import { FallbackResources } from '../lib/resources/resources.enum';
import { NormalizedFamilyTree } from '../types/genealogy';

export const getProfilePicture = (person: NormalizedFamilyTree) => {
  return person.metadata.profile === ''
    ? `${
        person.Gender === 'M'
          ? FallbackResources.profileMale
          : FallbackResources.profileFemale
      }`
    : person.metadata.profile;
};
