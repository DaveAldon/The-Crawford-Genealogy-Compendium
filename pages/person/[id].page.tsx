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
  moviesResult,
  artifactsResult,
}: {
  peopleResult: APIFamilyTree[];
  photosResult: APIArtifact[];
  id: string;
  moviesResult: APIArtifact[];
  artifactsResult: APIArtifact[];
}) => {
  const {
    person,
    photos,
    movies,
    artifacts,
    demographicsTable,
    parentsTable,
    childrenTable,
    siblingsTable,
    divorcedTable,
  } = usePerson({
    id,
    peopleResult,
    photosResult,
    moviesResult,
    artifactsResult,
  });

  const photoSrc = getResource(person.id, ResourceTypes.profile);
  const fallbackSrc = `${
    person.Gender === 'M'
      ? FallbackResources.profileMale
      : FallbackResources.profileFemale
  }`;
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });
  const age = getAge({ DOB: person.DOB, Death: person.Death });
  console.log(imageSrc);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

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
              <p className="pt-8 text-sm">{person.Description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {demographicsTable.length > 0 ? (
                  <Table title={'Demographics'} data={demographicsTable} />
                ) : null}
                {parentsTable.length > 0 ? (
                  <Table title={'Parents'} data={parentsTable} />
                ) : null}
                {childrenTable.length > 0 ? (
                  <Table title={'Children'} data={childrenTable} />
                ) : null}
                {siblingsTable.length > 0 ? (
                  <Table title={'Siblings'} data={siblingsTable} />
                ) : null}
                {divorcedTable.length > 0 ? (
                  <Table title={'Divorced'} data={divorcedTable} />
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {person.BirthplaceCoords ? (
                  <MapCard activeNode={person} birthplace />
                ) : null}
                {person.DeathplaceCoords ? (
                  <MapCard activeNode={person} />
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {photos && photos.length > 0 ? (
                  <Carousel
                    type={CarouselType.photo}
                    activeNode={person}
                    activeArtifact={photos}
                  />
                ) : null}
                {movies && movies.length > 0 ? (
                  <Carousel
                    type={CarouselType.video}
                    activeNode={person}
                    activeArtifact={movies}
                  />
                ) : null}
                {artifacts && artifacts.length > 0 ? (
                  <Carousel
                    type={CarouselType.artifact}
                    activeNode={person}
                    activeArtifact={artifacts}
                  />
                ) : null}
              </div>
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
  const moviesResult = await getArtifactData('Movies');
  const artifactsResult = await getArtifactData('Artifacts');
  const photosResult = await getArtifactData('Photos');
  const id = context.query.id;

  return {
    props: {
      id,
      peopleResult,
      photosResult,
      moviesResult,
      artifactsResult,
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
