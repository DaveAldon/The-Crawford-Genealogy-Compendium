import React, { useEffect, useState } from 'react';
import { Carousel, CarouselType } from '../../components/Carousel/Carousel';
import { Header } from '../../components/Header/Header';
import { MapCard } from '../../components/MapCard/MapCard';
import { Gender } from '../../components/relatives-tree/types';
import { Table } from '../../components/Table/Table';
import { useImageFallback } from '../../hooks/useImageFallback/useImageFallback';
import {
  getAllArtifactsByPersonId,
  getArtifactRowById,
  getPeopleRowById,
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

const Person = ({
  personResult,
  photosResult,
  spouseResult,
}: {
  personResult: APIFamilyTree;
  photosResult: APIArtifact[];
  spouseResult: APIFamilyTree;
}) => {
  const photoSrc = getResource(personResult.id, ResourceTypes.profile);
  const fallbackSrc = `${
    personResult.Gender === 'M'
      ? FallbackResources.profileMale
      : FallbackResources.profileFemale
  }`;
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });
  const dob = personResult.DOB ? `${personResult.DOB}` : '';
  const dod = personResult.Death ? `${personResult.Death}` : '';
  const age = getAge({ DOB: personResult.DOB, Death: personResult.Death });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const tableData = [
    ['Date of Birth', dob],
    ['Gender', getGender(personResult.Gender)],
  ];

  if (dod) tableData.push(['Date of Death', dod]);

  if (spouseResult)
    tableData.push([
      'Spouse',
      `${spouseResult.Firstname} ${spouseResult.Middlename} ${spouseResult.Lastname}`,
    ]);

  return (
    <div className="">
      <Header />
      <div className="font-sans antialiased text-white leading-normal tracking-wider bg-cover">
        <div className="max-w-4xl flex items-start h-auto lg:h-screen flex-wrap mx-auto py-32 lg:py-14">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-lg shadow-2xl bg-[#212224] opacity-75 mx-6 lg:mx-0">
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center overflow-hidden">
                <img
                  src={imageSrc}
                  onError={onError}
                  className="flex-shrink-0 min-w-full min-h-full"
                />
              </div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                {personResult.Firstname}
                {` ${personResult.Middlename}`} {personResult.Lastname} - {age}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
              <p className="pt-8 text-sm">
                Totally optional short description about yourself, what you do
                and so on.
              </p>
              <Table data={tableData} />
              <p className="pt-4 tnext-base font-bold flex items-center justify-center lg:justify-start">
                {dob}
              </p>
              <p className="pt-4 tnext-base font-bold flex items-center justify-center lg:justify-start">
                {dod}
              </p>
              {personResult.BirthplaceCoords ? (
                <MapCard activeNode={personResult} birthplace />
              ) : null}

              {personResult.DeathplaceCoords ? (
                <MapCard activeNode={personResult} />
              ) : null}
              {photosResult && photosResult.length > 0 ? (
                <Carousel
                  type={CarouselType.photo}
                  activeNode={personResult}
                  activeArtifact={photosResult}
                />
              ) : null}
              <div className="pt-12 pb-8">
                <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <img
              src={imageSrc}
              onError={onError}
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block flex-shrink-0 min-w-full min-h-full max-h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const personResult = await getPeopleRowById(context.query.id);
  const photosResult = await getAllArtifactsByPersonId(
    GoogleSheetIds.Photos,
    context.query.id,
  );
  const spouseResult = personResult.Spouse
    ? await getPeopleRowById(personResult.Spouse)
    : null;
  return { props: { personResult, photosResult, spouseResult } };
};

export default Person;
