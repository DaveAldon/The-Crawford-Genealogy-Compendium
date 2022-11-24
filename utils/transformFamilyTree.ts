import { Gender, RelType } from '../components/relatives-tree/types';
import { APIFamilyTree, TransformedFamilyTree } from '../types/geneology';

export const getTransformedFamilyTree = (familyTreeData: APIFamilyTree[]) => {
  const newNodes: TransformedFamilyTree[] = familyTreeData.map(person => {
    const parents = [];
    if (person.Father)
      parents.push({ id: person.Father, relType: RelType.blood });
    if (person.Mother)
      parents.push({ id: person.Mother, relType: RelType.blood });

    const spouses = [];
    if (person.Divorced) {
      const divorced = person.Divorced.split(',').map(divorcedSpouseId => {
        if (divorcedSpouseId !== '') {
          return {
            id: divorcedSpouseId.trim(),
            relType: RelType.divorced,
          };
        }
      });
      spouses.push(...divorced);
    }
    if (person.Spouse) {
      spouses.push({
        id: person.Spouse,
        relType: RelType.married,
      });
    }
    return {
      id: person.id,
      name: `${person.Firstname} ${person.Middlename} ${person.Lastname}`,
      gender: person.Gender === 'M' ? Gender.male : Gender.female,
      parents,
      siblings: [],
      spouses,
      children: [],
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

  return JSON.parse(JSON.stringify(newNodes)) as TransformedFamilyTree[];
};
