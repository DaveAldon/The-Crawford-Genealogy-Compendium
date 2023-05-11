import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FamilyLinkButton } from '../../components/Buttons/TableButton';
import { TableData } from '../../components/Table/Table';
import { getMilitaryImage } from '../../lib/resources/resources';
import { APIFamilyTree, NormalizedFamilyTree } from '../../types/genealogy';
import { camelCase } from '../../utils/capitalize';
import { Artifact } from '../../types/artifacts.d';

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
    setPhotos([...person.metadata.photos]);
    setMovies([...person.metadata.videos]);
    setArtifacts([...person.metadata.artifacts]);

    window.history.pushState(null, '', `/person/${person.id}`);
  }, [person]);

  useEffect(() => {
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
      if (
        person.military.awards !== '' &&
        person.military.awards !== undefined
      ) {
        person.military.awards.split(',').forEach(award => {
          tmpMilitaryTable.push({
            label: `Awarded - ${camelCase(
              award.replaceAll('_', ' ').split('.')[0],
            )}`,
            value: (
              <Image
                width={200}
                height={0}
                src={getMilitaryImage(award)}
                alt={award}
              />
            ),
          });
        });
      }

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
