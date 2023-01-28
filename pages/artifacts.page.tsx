import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { getCompendiumJson } from '../lib/compendiumJson';
import { Gallery, Image } from 'react-grid-gallery';
import { useArtifacts } from './Artifacts/useArtifacts';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function Artifacts({ images }: { images: Image[] }) {
  const {
    handleClick,
    currentImage,
    nextImage,
    prevImage,
    handleClose,
    handleMoveNext,
    handleMovePrev,
    index,
  } = useArtifacts({ images });
  return (
    <div className="text-black flex flex-col h-screen justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
              Artifacts
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              This is a collection of all photos, movies, and documentation that
              can be found attached to each person in the family tree. Here, you
              can see everything together, so that you can get a better sense of
              what information is available for the entire family.
            </p>
          </div>
          <div className="container lg:px-32 px-4 py-8 mx-auto items-center ">
            <Gallery
              images={images}
              onClick={handleClick}
              enableImageSelection={false}
            />
            <Lightbox
              open={currentImage ? true : false}
              close={() => handleClose()}
              slides={[...images]}
              index={index}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (_context: any) => {
  const data = await getCompendiumJson();
  const images: Image[] = [];
  data.forEach((item, i) => {
    item.resources.forEach((resource, ii) => {
      images.push({
        src: resource.url,
        width: resource.width,
        height: resource.height,
      });
    });
  });
  return {
    props: {
      images,
    },
  };
};
