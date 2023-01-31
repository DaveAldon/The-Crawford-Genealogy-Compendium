import { useEffect, useState } from 'react';
import { FamilyLinkButton } from '../../components/Buttons/TableButton';
import { Table, TableData } from '../../components/Table/Table';
import {
  APIArtifact,
  APIFamilyTree,
  NormalizedFamilyTree,
} from '../../types/genealogy';

export const usePerson = ({
  id,
  peopleResult,
}: {
  id: string;
  peopleResult: NormalizedFamilyTree[];
}) => {
  const [people, _setPeople] = useState<NormalizedFamilyTree[]>(peopleResult);
  const [person, setPerson] = useState<NormalizedFamilyTree>(
    peopleResult.filter((p: any) => p.id === id)[0] as NormalizedFamilyTree,
  );
  const [spouse, setSpouse] = useState<NormalizedFamilyTree | null>();
  const [mother, setMother] = useState<NormalizedFamilyTree | null>();
  const [father, setFather] = useState<NormalizedFamilyTree | null>();
  const [children, setChildren] = useState<NormalizedFamilyTree[]>([]);
  const [siblings, setSiblings] = useState<NormalizedFamilyTree[]>([]);
  const [divorced, setDivorced] = useState<NormalizedFamilyTree | null>();
  const [photos, setPhotos] = useState<APIArtifact[]>();
  const [movies, setMovies] = useState<APIArtifact[]>();
  const [artifacts, setArtifacts] = useState<APIArtifact[]>();

  const [demographicsTable, setDemographicsTable] = useState<TableData[]>([]);
  const [parentsTable, setParentsTable] = useState<TableData[]>([]);
  const [childrenTable, setChildrenTable] = useState<TableData[]>([]);
  const [siblingsTable, setSiblingsTable] = useState<TableData[]>([]);
  const [divorcedTable, setDivorcedTable] = useState<TableData[]>([]);

  const updatePerson = (id: string) => {
    const newPerson = people.find(
      (p: any) => p.id === id,
    ) as NormalizedFamilyTree;
    setPerson(newPerson);
  };

  useEffect(() => {
    if (person.Spouse) {
      setSpouse(
        people.find(
          (p: NormalizedFamilyTree) => p.id === person.Spouse,
        ) as NormalizedFamilyTree | null,
      );
    } else {
      setSpouse(null);
    }
    if (person.Mother) {
      setMother(
        people.find(
          (p: NormalizedFamilyTree) => p.id === person.Mother,
        ) as NormalizedFamilyTree | null,
      );
    } else {
      setMother(null);
    }
    if (person.Father) {
      setFather(
        people.find(
          (p: NormalizedFamilyTree) => p.id === person.Father,
        ) as NormalizedFamilyTree | null,
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
        (p: NormalizedFamilyTree) =>
          p.Father === person.Father &&
          p.Mother === person.Mother &&
          p.id !== person.id,
      ) as NormalizedFamilyTree[];
      setSiblings([...tmpSibling]);
    } else {
      setSiblings([]);
    }
    if (person.Divorced) {
      setDivorced(
        people.find(
          (p: NormalizedFamilyTree) => p.id === person.Divorced,
        ) as NormalizedFamilyTree | null,
      );
    } else {
      setDivorced(null);
    }

    setPhotos([
      ...person.metadata.resources.filter(
        (p: APIArtifact) => p.type === 'photo',
      ),
    ]);

    const tmpMovies = person.metadata.resources.filter(
      (p: APIArtifact) => p.type === 'video',
    );
    setMovies([...tmpMovies]);

    setArtifacts([
      ...person.metadata.resources.filter(
        (p: APIArtifact) => p.type === 'artifact',
      ),
    ]);

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
