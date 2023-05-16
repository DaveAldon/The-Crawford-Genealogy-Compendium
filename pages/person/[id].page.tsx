import React, { useEffect, useState } from 'react';
import { Carousel, CarouselType } from '../../components/Carousel/Carousel';
import { Header } from '../../components/Header/Header';
import { MapCard } from '../../components/MapCard/MapCard';
import { Table } from '../../components/Table/Table';
import { FallbackResources } from '../../lib/resources/resources.enum';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { getAge } from '../../utils/age';
import { usePerson } from './usePerson';
import Image from 'next/image';
import { getTreeData } from '../../lib/treeJson';

const Person = ({
  people,
  id,
}: {
  people: NormalizedFamilyTree[];
  id: string;
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
    militaryTable,
  } = usePerson({
    id,
    peopleResult: people,
  });

  const imageSrc = person.metadata.profile[0].link;

  const age = getAge({ DOB: person.DOB, Death: person.Death });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  return (
    <div className="text-white bg-black">
      <Header />
      <div className="font-sans leading-normal tracking-wider bg-cover">
        <div className="max-w-4xl flex items-start h-auto lg:h-screen flex-wrap mx-auto py-32 ">
          <div
            id="profile"
            className="w-full rounded-lg lg:rounded-lg shadow-2xl bg-[#212224] mx-6 lg:mx-0">
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div className="rounded-md shadow-xl mx-auto -mt-16 h-64 w-full bg-cover bg-center overflow-hidden mb-5">
                <div className="relative w-full">
                  <div className="rounded-md overflow-hidden absolute h-64 w-full">
                    <Image
                      alt="Home"
                      width={640}
                      height={480}
                      src={imageSrc}
                      className="h-64 w-full rounded-md object-cover blur-md"
                    />
                  </div>
                  <Image
                    alt="Home"
                    width={640}
                    height={480}
                    src={imageSrc}
                    className="h-64 w-full object-contain absolute"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                {person.Firstname}
                {` ${
                  person.Middlename !== null ? person.Middlename + ' ' : ''
                }`}{' '}
                {person.Lastname} - {age}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-500" />
              <p className="pt-4 text-md mb-4">{person.Description}</p>
              {militaryTable.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <Table title={'Military'} data={militaryTable} />
                </div>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {demographicsTable.length > 0 ? (
                  <Table title={'Demographics'} data={demographicsTable} />
                ) : null}
                {parentsTable.length > 0 ? (
                  <Table raw title={'Parents'} data={parentsTable} />
                ) : null}
                {childrenTable.length > 0 ? (
                  <Table raw title={'Children'} data={childrenTable} />
                ) : null}
                {siblingsTable.length > 0 ? (
                  <Table raw title={'Siblings'} data={siblingsTable} />
                ) : null}
                {divorcedTable.length > 0 ? (
                  <Table raw title={'Divorced'} data={divorcedTable} />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {person.BirthplaceCoords ? (
                  <MapCard activeNode={person} birthplace />
                ) : null}
                {person.DeathplaceCoords ? (
                  <MapCard activeNode={person} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = (context: any) => {
  const people = getTreeData();
  const id = context.query.id;

  return {
    props: {
      id,
      people,
    },
  };
};

export default Person;
