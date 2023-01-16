import { useEffect, useState } from 'react';
import { FamilyLinkButton } from '../../components/Buttons/TableButton';
import { Table, TableData } from '../../components/Table/Table';
import { APIArtifact, APIFamilyTree } from '../../types/geneology';

export const usePerson = ({
  id,
  peopleResult,
  photosResult,
  moviesResult,
  artifactsResult,
}: {
  id: string;
  peopleResult: APIFamilyTree[];
  photosResult: APIArtifact[];
  moviesResult: APIArtifact[];
  artifactsResult: APIArtifact[];
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
  const [divorced, setDivorced] = useState<APIFamilyTree | null>();
  const [photos, setPhotos] = useState<APIArtifact[]>();
  const [movies, setMovies] = useState<APIArtifact[]>();
  const [artifacts, setArtifacts] = useState<APIArtifact[]>();

  const [demographicsTable, setDemographicsTable] = useState<TableData[]>([]);
  const [parentsTable, setParentsTable] = useState<TableData[]>([]);
  const [childrenTable, setChildrenTable] = useState<TableData[]>([]);
  const [siblingsTable, setSiblingsTable] = useState<TableData[]>([]);
  const [divorcedTable, setDivorcedTable] = useState<TableData[]>([]);

  const updatePerson = (id: string) => {
    const newPerson = people.find((p: any) => p.id === id) as APIFamilyTree;
    setPerson(newPerson);
  };

  useEffect(() => {
    if (person.Spouse) {
      setSpouse(
        people.find(
          (p: APIFamilyTree) => p.id === person.Spouse,
        ) as APIFamilyTree | null,
      );
    } else {
      setSpouse(null);
    }
    if (person.Mother) {
      setMother(
        people.find(
          (p: APIFamilyTree) => p.id === person.Mother,
        ) as APIFamilyTree | null,
      );
    } else {
      setMother(null);
    }
    if (person.Father) {
      setFather(
        people.find(
          (p: APIFamilyTree) => p.id === person.Father,
        ) as APIFamilyTree | null,
      );
    } else {
      setFather(null);
    }
    setChildren(
      people.filter(
        (p: APIFamilyTree) => p.Father === person.id || p.Mother === person.id,
      ),
    );
    if (person.Father !== null && person.Mother !== null) {
      const tmpSibling = people.filter(
        (p: APIFamilyTree) =>
          p.Father === person.Father &&
          p.Mother === person.Mother &&
          p.id !== person.id,
      ) as APIFamilyTree[];
      setSiblings([...tmpSibling]);
    } else {
      setSiblings([]);
    }
    if (person.Divorced) {
      setDivorced(
        people.find(
          (p: APIFamilyTree) => p.id === person.Divorced,
        ) as APIFamilyTree | null,
      );
    } else {
      setDivorced(null);
    }

    if (photosResult) {
      setPhotos([
        ...photosResult.filter((p: APIArtifact) => p.id === person.id),
      ]);
    } else {
      setPhotos([]);
    }
    if (moviesResult) {
      const tmpMovies = moviesResult.filter(
        (p: APIArtifact) => p.id === person.id,
      );
      setMovies([...tmpMovies]);
    } else {
      setMovies([]);
    }
    if (artifactsResult) {
      setArtifacts([
        ...artifactsResult.filter((p: APIArtifact) => p.id === person.id),
      ]);
    } else {
      setArtifacts([]);
    }

    window.history.pushState(null, '', `/person/${person.id}`);
  }, [person]);

  useEffect(() => {
    const tmpDemographicsTable: TableData[] = [];
    const tmpParentsTable: TableData[] = [];
    const tmpDivorcedTable: TableData[] = [];
    const tmpChildrenTable: TableData[] = [];
    const tmpSiblingsTable: TableData[] = [];

    if (person.DOB) {
      tmpDemographicsTable.push({
        label: 'Date of Birth',
        value: person.DOB,
      });
    }
    if (person.Death) {
      tmpDemographicsTable.push({
        label: 'Date of Death',
        value: person.Death,
      });
    }
    if (person.Gender) {
      tmpDemographicsTable.push({
        label: 'Gender',
        value: person.Gender === 'M' ? 'Male' : 'Female',
      });
    }
    if (spouse) {
      tmpDemographicsTable.push({
        label: 'Spouse',
        value: <FamilyLinkButton updatePerson={updatePerson} person={spouse} />,
      });
    }
    setDemographicsTable([...tmpDemographicsTable]);
    if (mother) {
      tmpParentsTable.push({
        label: 'Mother',
        value: <FamilyLinkButton updatePerson={updatePerson} person={mother} />,
      });
    }
    if (father) {
      tmpParentsTable.push({
        label: 'Father',
        value: <FamilyLinkButton updatePerson={updatePerson} person={father} />,
      });
    }
    setParentsTable([...tmpParentsTable]);
    if (divorced) {
      tmpDivorcedTable.push({
        label: 'Divorced',
        value: (
          <FamilyLinkButton updatePerson={updatePerson} person={divorced} />
        ),
      });
      setDivorcedTable([...tmpDivorcedTable]);
    } else {
      setDivorcedTable([]);
    }
    if (children.length > 0) {
      children.forEach(child => {
        tmpChildrenTable.push({
          label: 'Child',
          value: (
            <FamilyLinkButton updatePerson={updatePerson} person={child} />
          ),
        });
      });
      setChildrenTable([...tmpChildrenTable]);
    } else {
      setChildrenTable([]);
    }
    if (siblings.length > 0) {
      siblings.forEach(sibling => {
        tmpSiblingsTable.push({
          label: 'Sibling',
          value: (
            <FamilyLinkButton updatePerson={updatePerson} person={sibling} />
          ),
        });
      });
      setSiblingsTable([...tmpSiblingsTable]);
    } else {
      setSiblingsTable([]);
    }
  }, [person, mother, father, spouse, divorced, children, siblings]);

  return {
    person,
    spouse,
    mother,
    father,
    children,
    updatePerson,
    photos,
    siblings,
    divorced,
    demographicsTable,
    parentsTable,
    childrenTable,
    siblingsTable,
    divorcedTable,
    movies,
    artifacts,
  };
};
