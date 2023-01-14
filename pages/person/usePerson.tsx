import Router from 'next/router';
import { useEffect, useState } from 'react';
import { APIArtifact, APIFamilyTree } from '../../types/geneology';

export const usePerson = ({
  id,
  peopleResult,
  photosResult,
}: {
  id: string;
  peopleResult: APIFamilyTree[];
  photosResult: APIArtifact[];
}) => {
  const [people, _setPeople] = useState<APIFamilyTree[]>(peopleResult);
  const [person, setPerson] = useState<APIFamilyTree>(
    peopleResult.filter((p: any) => p.id === id)[0] as APIFamilyTree,
  );
  const [spouse, setSpouse] = useState<APIFamilyTree | null>();
  const [mother, setMother] = useState<APIFamilyTree | null>();
  const [father, setFather] = useState<APIFamilyTree | null>();
  const [children, setChildren] = useState<APIFamilyTree[]>([]);
  const [siblings, setSiblings] = useState<APIFamilyTree[]>([]);
  const [photos, setPhotos] = useState<APIArtifact[]>();

  const updatePerson = (id: string) => {
    const newPerson = people.find((p: any) => p.id === id) as APIFamilyTree;
    setPerson(newPerson);
  };

  useEffect(() => {
    setSpouse(
      people.find(
        (p: APIFamilyTree) => p.id === person.Spouse,
      ) as APIFamilyTree | null,
    );
    setMother(
      people.find(
        (p: APIFamilyTree) => p.id === person.Mother,
      ) as APIFamilyTree | null,
    );
    setFather(
      people.find(
        (p: APIFamilyTree) => p.id === person.Father,
      ) as APIFamilyTree | null,
    );
    setChildren(
      people.filter(
        (p: APIFamilyTree) => p.Father === person.id || p.Mother === person.id,
      ),
    );
    setSiblings(
      people.filter(
        (p: APIFamilyTree) =>
          p.Father === person.Father &&
          p.Mother === person.Mother &&
          p.id !== person.id,
      ) as APIFamilyTree[],
    );
    setPhotos(photosResult.filter((p: APIArtifact) => p.id === person.id));
    window.history.pushState(null, '', `/person/${person.id}`);
  }, [person]);

  return {
    person,
    spouse,
    mother,
    father,
    children,
    updatePerson,
    photos,
    siblings,
  };
};
