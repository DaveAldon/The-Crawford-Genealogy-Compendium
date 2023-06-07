import { useEffect, useState } from 'react';
import { FamilyLinkButton } from '../../components/Buttons/TableButton';
import { TableData } from '../../components/Table/Table';
import { APIFamilyTree, NormalizedFamilyTree } from '../../types/genealogy';
import { Artifact } from '../../types/artifacts.d';

export const usePerson = ({
  id,
  peopleResult,
  selectedFamily,
}: {
  id: string;
  peopleResult: NormalizedFamilyTree[];
  selectedFamily: string;
}) => {
  const [people, setPeople] = useState<NormalizedFamilyTree[]>([]);
  const [person, setPerson] = useState<NormalizedFamilyTree>(
    peopleResult.filter((p: any) => p.id === id)[0] as NormalizedFamilyTree,
  );
  const [spouse, setSpouse] = useState<NormalizedFamilyTree | null>();
  const [mother, setMother] = useState<NormalizedFamilyTree | null>();
  const [father, setFather] = useState<NormalizedFamilyTree | null>();
  const [children, setChildren] = useState<NormalizedFamilyTree[]>([]);
  const [siblings, setSiblings] = useState<NormalizedFamilyTree[]>([]);
  const [divorced, setDivorced] = useState<NormalizedFamilyTree | null>();
  const [photos, setPhotos] = useState<Artifact[]>();
  const [movies, setMovies] = useState<Artifact[]>();
  const [artifacts, setArtifacts] = useState<Artifact[]>();

  const [demographicsTable, setDemographicsTable] = useState<TableData[]>([]);
  const [parentsTable, setParentsTable] = useState<TableData[]>([]);
  const [childrenTable, setChildrenTable] = useState<TableData[]>([]);
  const [siblingsTable, setSiblingsTable] = useState<TableData[]>([]);
  const [divorcedTable, setDivorcedTable] = useState<TableData[]>([]);
  const [militaryTable, setMilitaryTable] = useState<TableData[]>([]);

  const updatePerson = (id: string) => {
    const newPerson = people.find(
      (p: any) => p.id === id,
    ) as NormalizedFamilyTree;
    setPerson(newPerson);
  };

  useEffect(() => {
    setPeople([...peopleResult]);
    setPerson(
      peopleResult.filter((p: any) => p.id === id)[0] as NormalizedFamilyTree,
    );
  }, [peopleResult]);

  useEffect(() => {
    if (people.length === 0) return;
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
    if (person.Father !== '' && person.Mother !== '') {
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
    setPhotos([...person.metadata.photos]);
    setMovies([...person.metadata.videos]);
    setArtifacts([...person.metadata.artifacts]);

    window.history.pushState(
      null,
      '',
      `/person/${person.id}?family=${selectedFamily}`,
    );
  }, [person]);

  useEffect(() => {
    if (people.length === 0) return;
    const tmpDemographicsTable: TableData[] = [];
    const tmpParentsTable: TableData[] = [];
    const tmpDivorcedTable: TableData[] = [];
    const tmpChildrenTable: TableData[] = [];
    const tmpSiblingsTable: TableData[] = [];
    const tmpMilitaryTable: TableData[] = [];

    if (person.military) {
      tmpMilitaryTable.push({
        label: 'Branch',
        value: person.military.branch,
      });
      person.military.rank &&
        tmpMilitaryTable.push({
          label: 'Rank',
          value: person.military.rank,
        });
      person.military.start &&
        tmpMilitaryTable.push({
          label: 'Start Date',
          value: person.military.start,
        });
      person.military.end &&
        tmpMilitaryTable.push({
          label: 'Discharge Date',
          value: person.military.end,
        });

      const awards: TableData[] = [];
      person.metadata.military.forEach(award => {
        awards.push({
          label: award.description,
          value: (
            <img
              alt={award.description}
              src={award.link}
              style={{ width: '200px' }}
            />
          ),
        });
      });
      awards.sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }
        if (a.label > b.label) {
          return 1;
        }
        return 0;
      });
      tmpMilitaryTable.push(...awards);

      setMilitaryTable([...tmpMilitaryTable]);
    } else {
      setMilitaryTable([]);
    }

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
    militaryTable,
  };
};
