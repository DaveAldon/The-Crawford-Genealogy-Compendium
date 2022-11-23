import { Gender, RelType } from "../components/relatives-tree/types";
import { APIFamilyTree, TransformedFamilyTree } from "../types/geneology";

export const getTransformedFamilyTree = (familyTreeData: APIFamilyTree[]) => {
    const newNodes: TransformedFamilyTree[] = familyTreeData.map(person => {
      const parents = [];
      if (person.Father)
        parents.push({ id: person.Father, relType: RelType.blood });
      if (person.Mother)
        parents.push({ id: person.Mother, relType: RelType.blood });
      return {
        id: person.id,
        name: `${person.Firstname} ${person.Middlename} ${person.Lastname}`,
        gender: person.Gender === 'M' ? Gender.male : Gender.female,
        parents,
        siblings: [],
        spouses: [],
        children: [],
      };
    });
    newNodes.forEach(person => {
      // spouses
      person.spouses = familyTreeData
        .filter(p => p.Spouse === person.id)
        .map(p => ({ id: p.id, relType: RelType.married }));

      person.parents.forEach(parent => {
        const parentPerson = newNodes.find(p => p.id === parent.id);
        if (parentPerson) {
          // children
          parentPerson.children.push({
            id: person.id,
            relType: RelType.blood,
          });
          // siblings
          parentPerson.children.forEach(child => {
            if (child.id !== person.id) {
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
}