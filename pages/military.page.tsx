import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { getTreeData } from '../lib/treeJson';
import { NormalizedFamilyTree } from '../types/genealogy';
import { getProfilePicture } from '../utils/profilePicture';
import { ProfileInfo } from './FamilyTree/components/FamilyNode/components/ProfileInfo/ProfileInfo';
import { ProfilePhoto } from './FamilyTree/components/FamilyNode/components/ProfilePhoto/ProfilePhoto';

interface EraData {
  title: string;
  src: string;
}
const eras = [
  {
    title: 'The Revolutionary War',
    src: '/eras/revolution.jpg',
  },
  {
    title: 'The Civil War',
    src: '/eras/civilwar.png',
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
      }}>
      <ProfileInfo height={'12%'} title={eraData.title} fontSize={'.8rem'} />
      <ProfilePhoto src={eraData.src} alt={'name'} />
      <ProfileInfo height={'22%'} title={'name' || ''} fontSize={'.40rem'} />
    </div>
  );
};

export default function Military({ data }: { data: NormalizedFamilyTree[] }) {
  console.log(data);
  return (
    <div className="text-black flex flex-col h-screen justify-between bg-black">
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
            {eras.map(era => {
              return (
                <div
                  key={era.title}
                  className="container lg:px-0 px-4 py-8 mx-auto items-center grid grid-cols-6 gap-2">
                  <Era eraData={era} />
                  {data.map(person => {
                    const profileSrc = getProfilePicture(person);
                    return (
                      <div
                        key={person.id}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          height: '500px',
                        }}>
                        <ProfileInfo
                          height={'12%'}
                          title={'headerText'}
                          fontSize={'.50rem'}
                        />
                        <ProfilePhoto src={profileSrc} alt={'name'} />
                        <ProfileInfo
                          height={'22%'}
                          title={'name' || ''}
                          fontSize={'.40rem'}
                        />
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

export const getServerSideProps = async (_context: any) => {
  const data = await getTreeData();
  const filteredData = data.filter(
    person => person.metadata.military !== undefined,
  );
  return {
    props: {
      data: filteredData,
    },
  };
};
