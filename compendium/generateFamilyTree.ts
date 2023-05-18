import { FallbackResources } from '../lib/resources/resources.enum';
import { Artifacts } from '../types/artifacts';
import { NormalizedFamilyTree, Relation } from '../types/genealogy';
import { Gender, RelType } from '../types/tree.d';
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

const emptyNode: NormalizedFamilyTree = {
  name: '',
  id: '',
  gender: '',
  parents: [],
  children: [],
  siblings: [],
  spouses: [],
  metadata: { ...emptyMetadata },
  Firstname: '',
  Middlename: '',
  Lastname: '',
  Gender: '',
  DOB: '',
  Birthplace: '',
  BirthplaceCoords: '',
  Death: '',
  Deathplace: '',
  DeathplaceCoords: '',
  Mother: '',
  Father: '',
  Spouse: '',
  Divorced: '',
  Description: '',
};

const getSpouseNodes = (
  familyTreeData: NormalizedFamilyTree[],
): NormalizedFamilyTree[] => {
  const spouseNodes: NormalizedFamilyTree[] = [];

  familyTreeData.forEach(person => {
    person.spouses.forEach(spouse => {
      const spouseNode: NormalizedFamilyTree = {
        ...emptyNode,
        Description: 'marriage-node',
      };
      const spouseRef = familyTreeData.find(p => p.id === spouse.id);
      if (spouseRef) {
        const husbandNode = spouseRef.Gender === 'M' ? spouseRef : person;
        const wifeNode = spouseRef.Gender === 'F' ? spouseRef : person;

        const spouseId = `marriage-node~${husbandNode.id}~${wifeNode.id}`;
        if (!spouseNodes.find(n => n.id === spouseId)) {
          spouseNode.id = spouseId;
          spouseNode.metadata.profile[0] = {
            mimeType: '',
            thumbnailLink: FallbackResources.union,
            link: FallbackResources.union,
            name: '',
            id: '',
            description: '',
            imageMediaMetadata: {
              width: 100,
              height: 100,
            },
          };
          spouseNode.name = `${husbandNode.Firstname} & ${wifeNode.Firstname}`;
          spouseNodes.push(spouseNode);
        }
      }
    });
  });
  return spouseNodes;
};

const position = { x: 0, y: 0 };

export const generateFamilyTree = async () => {
  const { people: familyTreeData } = await getFamilyTree();
  const military = await getMilitaryData();
  const artifacts = await getArtifacts();

  const newNodes: NormalizedFamilyTree[] = familyTreeData.map(person => {
    const parents: Relation[] = [];
    if (person.Father)
      parents.push({ id: person.Father, relType: RelType.blood });
    if (person.Mother)
      parents.push({ id: person.Mother, relType: RelType.blood });

    const spouses: Relation[] = [];
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
      spouses.push(...(divorced as Relation[]));
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
      ...person,
      name: `${person.Firstname} ${person.Middlename} ${person.Lastname}`,
      gender: person.Gender === 'M' ? Gender.male : Gender.female,
      parents,
      siblings: [],
      spouses,
      children: [],
      metadata: { ...metadata },
      military: military.find(m => m.id === person.id),
      position,
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

  return JSON.parse(
    JSON.stringify([...newNodes, ...getSpouseNodes(newNodes)]),
  ) as NormalizedFamilyTree[];
};
