import { FallbackResources } from '../lib/resources/resources.enum';
import { Artifacts } from '../types/artifacts';
import { Gender, NormalizedFamilyTree, RelType } from '../types/tree.d';
import { getFamilyTree } from './familytree';
import { getMilitaryData } from './lib/googlesheets';
import { getArtifacts } from './metadata';

const emptyMetadata: Artifacts = {
  videos: [],
  photos: [],
  artifacts: [],
  military: [],
  miscellaneous: [],
  profile: [],
};

export const generateFamilyTree = async () => {
  const { people: familyTreeData } = await getFamilyTree();
  const military = await getMilitaryData();
  const artifacts = await getArtifacts();

  const newNodes: NormalizedFamilyTree[] = familyTreeData.map(person => {
    const parents = [];
    if (person.Father)
      parents.push({ id: person.Father, relType: RelType.blood });
    if (person.Mother)
      parents.push({ id: person.Mother, relType: RelType.blood });

    const spouses = [];
    if (person.Divorced) {
      const divorced = person.Divorced.split(',').map(
        (divorcedSpouseId: string) => {
          if (divorcedSpouseId !== '') {
            return {
              id: divorcedSpouseId.trim(),
              relType: RelType.divorced,
            };
          }
        },
      );
      spouses.push(...divorced);
    }
    if (person.Spouse) {
      spouses.push({
        id: person.Spouse,
        relType: RelType.married,
      });
    }

    const metadata = artifacts.find(a => a.ownerId === person.id) || {
      ...emptyMetadata,
    };

    metadata.profile =
      metadata.profile.length === 0
        ? [
            {
              mimeType: '',
              thumbnailLink: `${
                person.Gender === 'M'
                  ? FallbackResources.profileMale
                  : FallbackResources.profileFemale
              }`,
              link: `${
                person.Gender === 'M'
                  ? FallbackResources.profileMale
                  : FallbackResources.profileFemale
              }`,
              name: '',
              id: '',
              description: '',
              imageMediaMetadata: {},
            },
          ]
        : metadata.profile;

    delete metadata?.ownerId;

    return {
      name: `${person.Firstname} ${person.Middlename} ${person.Lastname}`,
      gender: person.Gender === 'M' ? Gender.male : Gender.female,
      parents,
      siblings: [],
      spouses,
      children: [],
      metadata: metadata,
      military: military.find(m => m.id === person.id),
      ...person,
    };
  });

  // calculate children
  newNodes.forEach(person => {
    person.parents.forEach(parent => {
      const parentPerson = newNodes.find(p => p.id === parent.id);
      if (parentPerson) {
        parentPerson.children.push({
          id: person.id,
          relType: RelType.blood,
        });
      }
    });
  });

  // calculate siblings
  newNodes.forEach(person => {
    person.parents.forEach(parent => {
      const parentPerson = newNodes.find(p => p.id === parent.id);
      if (parentPerson) {
        parentPerson.children.forEach(child => {
          if (
            child.id !== person.id &&
            person.siblings.findIndex(s => s.id === child.id) === -1
          ) {
            person.siblings.push({
              id: child.id,
              relType: RelType.blood,
            });
          }
        });
      }
    });
  });

  return JSON.parse(JSON.stringify(newNodes)) as NormalizedFamilyTree[];
};
