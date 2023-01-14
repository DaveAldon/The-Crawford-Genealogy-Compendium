import React, { useEffect, useState } from 'react';
import { FamilyLinkButton } from '../../components/Buttons/TableButton';
import { Carousel, CarouselType } from '../../components/Carousel/Carousel';
import { Header } from '../../components/Header/Header';
import { MapCard } from '../../components/MapCard/MapCard';
import { Table, TableData } from '../../components/Table/Table';
import { useImageFallback } from '../../hooks/useImageFallback/useImageFallback';
import {
  getAllArtifactsByPersonId,
  getArtifactData,
  getPeopleRowById,
  getSheetData,
} from '../../lib/googlesheets';
import { getResource } from '../../lib/resources/resources';
import {
  FallbackResources,
  GoogleSheetIds,
  ResourceTypes,
} from '../../lib/resources/resources.enum';
import { APIArtifact, APIFamilyTree } from '../../types/geneology';
import { getAge } from '../../utils/age';
import { getGender } from '../../utils/gender';
import { usePerson } from './usePerson';

const Person = ({
  peopleResult,
  photosResult,
  id,
}: {
  peopleResult: APIFamilyTree[];
  photosResult: APIArtifact[];
  id: string;
}) => {
  const {
    person,
    spouse,
    mother,
    father,
    children,
    updatePerson,
    photos,
    siblings,
  } = usePerson({
    id,
    peopleResult,
    photosResult,
  });

  const photoSrc = getResource(person.id, ResourceTypes.profile);
  const fallbackSrc = `${
    person.Gender === 'M'
      ? FallbackResources.profileMale
      : FallbackResources.profileFemale
  }`;
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });
  const dob = person.DOB ? `${person.DOB}` : '';
  const dod = person.Death ? `${person.Death}` : '';
  const age = getAge({ DOB: person.DOB, Death: person.Death });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const tableData: TableData[] = [
    {
      label: 'Date of Birth',
      value: dob,
    },
    {
      label: 'Gender',
      value: getGender(person.Gender),
    },
  ];
  if (dod)
    tableData.push({
      label: 'Date of Death',
      value: dod,
    });
  if (spouse)
    tableData.push({
      label: 'Spouse',
      value: (
        <FamilyLinkButton
          updatePerson={updatePerson}
          personId={spouse.id}
          personName={`${spouse.Firstname} ${spouse.Middlename} ${spouse.Lastname}`}
        />
      ),
    });
  if (mother)
    tableData.push({
      label: 'Mother',
      value: (
        <FamilyLinkButton
          updatePerson={updatePerson}
          personId={mother.id}
          personName={`${mother.Firstname} ${mother.Middlename} ${mother.Lastname}`}
        />
      ),
    });
  if (father)
    tableData.push({
      label: 'Father',
      value: (
        <FamilyLinkButton
          updatePerson={updatePerson}
          personId={father.id}
          personName={`${father.Firstname} ${father.Middlename} ${father.Lastname}`}
        />
      ),
    });
  if (children.length > 0)
    children.forEach(child => {
      tableData.push({
        label: 'Child',
        value: (
          <FamilyLinkButton
            updatePerson={updatePerson}
            personId={child.id}
            personName={`${child.Firstname} ${child.Middlename} ${child.Lastname}`}
          />
        ),
      });
    });
  if (siblings.length > 0)
    siblings.forEach(sibling => {
      tableData.push({
        label: 'Sibling',
        value: (
          <FamilyLinkButton
            updatePerson={updatePerson}
            personId={sibling.id}
            personName={`${sibling.Firstname} ${sibling.Middlename} ${sibling.Lastname}`}
          />
        ),
      });
    });

  return (
    <div className="text-white">
      <Header />
      <div className="font-sans leading-normal tracking-wider bg-cover">
        <div className="max-w-4xl flex items-start h-auto lg:h-screen flex-wrap mx-auto py-32 ">
          <div
            id="profile"
            className="w-full  rounded-lg lg:rounded-lg shadow-2xl bg-[#212224] mx-6 lg:mx-0">
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div className="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center overflow-hidden">
                <img
                  src={imageSrc}
                  onError={onError}
                  className="flex-shrink-0 min-w-full min-h-full"
                />
              </div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                {person.Firstname}
                {` ${person.Middlename}`} {person.Lastname} - {age}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-500" />
              <p className="pt-8 text-sm">
                Totally optional short description about yourself, what you do
                and so on.
              </p>
              <Table data={tableData} />
              {person.BirthplaceCoords ? (
                <MapCard activeNode={person} birthplace />
              ) : null}
              {person.DeathplaceCoords ? <MapCard activeNode={person} /> : null}
              {photos && photos.length > 0 ? (
                <Carousel
                  type={CarouselType.photo}
                  activeNode={person}
                  activeArtifact={photos}
                />
              ) : null}
              <div className="pt-12 pb-8">
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded-full">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
          {/* <div className="">
            <img
              src={imageSrc}
              onError={onError}
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block flex-shrink-0 min-w-full min-h-full max-h-96"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const peopleResult = await getSheetData();
  const movies = await getArtifactData('Movies');
  const artifacts = await getArtifactData('Artifacts');
  const photos = await getArtifactData('Photos');
  const id = context.query.id;
  const photosResult = photos.filter((p: any) => p.id === id) as APIArtifact[];

  return {
    props: {
      id,
      peopleResult,
      photosResult,
    },
  };

  /* const personResult = await getPeopleRowById(context.query.id);
  const photosResult = await getAllArtifactsByPersonId(
    GoogleSheetIds.Photos,
    context.query.id,
  );
  const spouseResult = personResult.Spouse
    ? await getPeopleRowById(personResult.Spouse)
    : null;
  const motherResult = personResult.Mother
    ? await getPeopleRowById(personResult.Mother)
    : null;
  const fatherResult = personResult.Father
    ? await getPeopleRowById(personResult.Father)
    : null;
  return {
    props: {
      personResult,
      photosResult,
      spouseResult,
      motherResult,
      fatherResult,
    },
  }; */
};

export default Person;
