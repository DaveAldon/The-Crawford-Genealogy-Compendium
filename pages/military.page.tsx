import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { getTreeData } from '../lib/treeJson';
import { NormalizedFamilyTree } from '../types/genealogy';

export default function Military({ data }: { data: NormalizedFamilyTree[] }) {
  return (
    <div className="text-black flex flex-col h-screen justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
              Military
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              All known members of the family who served in the military. Click
              on a profile to see more information about their service history.
            </p>
          </div>
          <div className="container lg:px-32 px-4 py-8 mx-auto items-center "></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (_context: any) => {
  const data = await getTreeData();

  return {
    props: {
      data,
    },
  };
};
