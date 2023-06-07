'use client';
import React from 'react';
import { families } from '../compendium/lib/families';
import { Footer } from '../components/Footer/Footer';
import { ProfileInfo } from '../components/GraphTree/GraphNode/components/ProfileInfo/ProfileInfo';
import { ProfilePhoto } from '../components/GraphTree/GraphNode/components/ProfilePhoto/ProfilePhoto';
import { Header } from '../components/Header/Header';
import { NormalizedFamilyTree } from '../types/genealogy';
import { SearchFamilies } from '../components/SearchResults/SearchFamilies';
import { getTreeJsonClient } from '../lib/getTreeJsonClient';

interface EraData {
  title: string;
  src: string;
  description: string;
}
const eras = [
  {
    title: 'Revolutionary War',
    src: '/eras/revolution.jpg',
    description:
      'Fought between the United States and Great Britain from 1775 to 1783',
  },
  {
    title: 'War of 1812',
    src: '/eras/1812.png',
    description:
      'Fought between the United States and Great Britain from 1812 to 1815',
  },
  {
    title: 'Civil War',
    src: '/eras/civilwar.png',
    description:
      'Fought between the United States and the Confederate States from 1861 to 1865',
  },
  {
    title: 'Korean War',
    src: '/eras/koreanwar.jpg',
    description:
      'Fought between members of the United Nations and North Korea from 1950 to 1953',
  },
  {
    title: 'War on Terror',
    src: '/eras/waronterror.jpg',
    description:
      'An ongoing international counterterrorism military campaign following the September 11 attacks',
  },
];

const Era = ({ eraData }: { eraData: EraData }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '500px',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
      <ProfileInfo height={'12%'} title={eraData.title} fontSize={'.8rem'} />
      <ProfilePhoto
        src={eraData.src}
        alt={'name'}
        height={'100%'}
        width={'100%'}
      />
      <ProfileInfo
        height={'22%'}
        title={eraData.description}
        fontSize={'.70rem'}
        style={{ padding: '10px', borderRadius: '0 0 10px 10px' }}
      />
    </div>
  );
};

export default function Military() {
  const [selectedFamily, setSelectedFamily] = React.useState(families[0]);
  const [data, setData] = React.useState<NormalizedFamilyTree[]>([]);

  React.useEffect(() => {
    (async () => {
      const nodeData = await getTreeJsonClient(selectedFamily);
      const filteredData = nodeData.filter(
        person => person.metadata.military !== undefined,
      );
      setData([...filteredData]);
    })();
  }, [selectedFamily]);

  return (
    <div className="text-black flex flex-col justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <>
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
                Military
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                All known members of the family who served in the military.
                Select a profile to see more information about them and their
                service history.
              </p>
            </div>
            <div className="flex justify-center mb-10 bg-[#1f2124] w-fit rounded-md">
              <SearchFamilies
                selectedFamily={selectedFamily}
                setSelectedFamily={setSelectedFamily}
              />
            </div>
            {eras.map(era => {
              return (
                <div
                  key={era.title}
                  className="container px-0 items-center grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 gap-2">
                  <Era eraData={era} />
                  {data
                    .filter(person => person.military?.theater === era.title)
                    .map(person => {
                      const profileSrc = person.metadata.profile[0].link;
                      const description = person.military?.description
                        ? ` - ${person.military?.description}`
                        : '';
                      return (
                        <div
                          key={person.id}
                          style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                          }}>
                          <a
                            href={`/person/${person.id}?family=${
                              selectedFamily === ''
                                ? 'Crawford'
                                : selectedFamily
                            }`}
                            target="_blank"
                            rel="noreferrer">
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                height: '500px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                              }}>
                              <ProfileInfo
                                height={'12%'}
                                title={person.name.replace(' null', '') || ''}
                                fontSize={'.8rem'}
                              />
                              <ProfilePhoto
                                src={profileSrc}
                                alt={'name'}
                                height={'100%'}
                                width={'100%'}
                              />
                              <ProfileInfo
                                height={'22%'}
                                title={`${person.military?.branch}${description}`}
                                fontSize={'.8rem'}
                                style={{
                                  borderRadius: '0 0 10px 10px',
                                  padding: '10px',
                                }}
                              />
                            </div>
                          </a>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </>
        </div>
      </section>
      <Footer />
    </div>
  );
}
