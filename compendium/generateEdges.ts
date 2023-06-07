import { Edge } from 'reactflow';
import { NormalizedFamilyTree } from '../types/genealogy';
import * as fs from 'fs';

const getGenderFromId = (id: string, json: NormalizedFamilyTree[]): string => {
  const personNode = json.find(person => person.id === id);
  return personNode?.gender || '';
};

const getSpouseIds = (id: string, json: NormalizedFamilyTree[]): string[] => {
  const personNode = json.find(person => person.id === id);
  const spouseIds: string[] = [];
  personNode?.spouses.forEach(spouse => {
    const spouseRef = json.find(person => person.id === spouse.id);
    if (!spouseRef) return;
    const husbandNode = spouseRef.Gender === 'M' ? spouseRef : personNode;
    const wifeNode = spouseRef.Gender === 'F' ? spouseRef : personNode;

    const spouseId = `marriage-node~${husbandNode.id}~${wifeNode.id}`;
    spouseIds.push(spouseId);
  });
  return spouseIds;
};

export const generateEdges = (path: string): Edge[] => {
  const jsonString = fs.readFileSync(path, 'utf-8');
  const json = JSON.parse(jsonString) as NormalizedFamilyTree[];

  const edges: Edge[] = [];

  json.forEach(person => {
    const spouseIdNodes = getSpouseIds(person.id, json);
    const gender = getGenderFromId(person.id, json);

    spouseIdNodes.forEach(spouseIdNode => {
      const target = spouseIdNode;
      const source = person.id;
      const edge = {
        id: `${source}~${target}`,
        source,
        target,
        sourceHandle: gender === 'male' ? 'bs' : 'bs',
        targetHandle: gender === 'male' ? 'tt' : 'tt',
      };
      edges.push(edge);
    });

    if (person.parents.length !== 0) {
      let parentNodeId = '';
      if (person.Father !== '' && person.Mother !== '') {
        parentNodeId = `marriage-node~${person.Father}~${person.Mother}`;
      } else
        parentNodeId = person.Father !== '' ? person.Father : person.Mother;

      const source = parentNodeId;
      const target = person.id;
      const edge = {
        id: `${source}~${target}`,
        source,
        target,
        sourceHandle: 'bs',
        targetHandle: 'tt',
      };
      edges.push(edge);
    }

    /* person.spouses.forEach(spouse => {
      if (!edges.find(edge => edge.id === `${spouse.id}~${person.id}`)) {
        const source = person.id;
        const target = spouse.id;
        const edge = {
          id: `${source}~${target}`,
          source,
          target,
          sourceHandle: 'ls',
          targetHandle: 'rt',
        };
        edges.push(edge);
      }
    }); */
  });
  return edges;
};
