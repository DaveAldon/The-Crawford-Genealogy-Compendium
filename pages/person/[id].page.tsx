'use client';
import React, { useEffect, useState } from 'react';
import {
  ArtifactCarousel,
  CarouselType,
} from '../../components/Carousel/Carousel';
import { Header } from '../../components/Header/Header';
import { MapCard } from '../../components/MapCard/MapCard';
import { Table } from '../../components/Table/Table';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { getAge } from '../../utils/age';
import { usePerson } from './usePerson';
import { getTreeJsonClient } from '../../lib/getTreeJsonClient';

const Person = ({ id, family }: { id: string; family: string }) => {
  const [people, setPeople] = useState<NormalizedFamilyTree[]>([]);
  const data = usePerson({ id, peopleResult: people, selectedFamily: family });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      const nodeData = await getTreeJsonClient(family);
      setPeople([...nodeData]);
    })();
  }, [family]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !data || !data.person || !data.person.metadata) {
    return null;
  }

  const imageSrc = data.person.metadata.profile[0].link;
  const age = getAge({ DOB: data.person.DOB, Death: data.person.Death });

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
                    <img
                      referrerPolicy="no-referrer"
                      src={imageSrc}
                      alt=""
                      style={{
                        height: 480,
                        width: '100%',
                        objectFit: 'cover',
                      }}
                      className="h-64 w-full rounded-md object-cover blur-md"
                    />
                  </div>

                  <img
                    referrerPolicy="no-referrer"
                    src={imageSrc}
                    alt="profile picture"
                    style={{
                      width: '100%',
                    }}
                    className="h-64 w-full object-contain absolute"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                {data.person.Firstname}
                {` ${
                  data.person.Middlename !== null
                    ? data.person.Middlename + ' '
                    : ''
                }`}{' '}
                {data.person.Lastname} - {age}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-indigo-500" />
              <p className="pt-4 text-md mb-4">{data.person.Description}</p>
              {data.militaryTable.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-1">
                  <Table title={'Military'} data={data.militaryTable} />
                </div>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.demographicsTable.length > 0 ? (
                  <Table title={'Demographics'} data={data.demographicsTable} />
                ) : null}
                {data.parentsTable.length > 0 ? (
                  <Table raw title={'Parents'} data={data.parentsTable} />
                ) : null}
                {data.childrenTable.length > 0 ? (
                  <Table raw title={'Children'} data={data.childrenTable} />
                ) : null}
                {data.siblingsTable.length > 0 ? (
                  <Table raw title={'Siblings'} data={data.siblingsTable} />
                ) : null}
                {data.divorcedTable.length > 0 ? (
                  <Table raw title={'Divorced'} data={data.divorcedTable} />
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {data.photos && data.photos.length > 0 ? (
                  <ArtifactCarousel
                    type={CarouselType.photo}
                    activeNode={data.person}
                    activeArtifact={data.photos}
                  />
                ) : null}
                {data.movies && data.movies.length > 0 ? (
                  <ArtifactCarousel
                    type={CarouselType.video}
                    activeNode={data.person}
                    activeArtifact={data.movies}
                  />
                ) : null}
                {data.artifacts && data.artifacts.length > 0 ? (
                  <ArtifactCarousel
                    type={CarouselType.artifact}
                    activeNode={data.person}
                    activeArtifact={data.artifacts}
                  />
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.person.BirthplaceCoords ? (
                  <MapCard activeNode={data.person} birthplace />
                ) : null}
                {data.person.DeathplaceCoords ? (
                  <MapCard activeNode={data.person} />
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
  const id = context.query.id;
  const family = context.query.family;

  return {
    props: {
      id,
      family,
    },
  };
};

export default Person;
