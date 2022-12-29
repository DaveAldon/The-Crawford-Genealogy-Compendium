import { motion } from 'framer-motion';
import { getResource } from '../../lib/resources/resources';
import { ResourceTypes } from '../../lib/resources/resources.enum';
import { Heights } from '../../styles/constants.enum';
import { APIArtifact, APIFamilyTree } from '../../types/geneology';
import { Carousel, CarouselType } from '../Carousel/Carousel';
import { MapCard } from '../MapCard/MapCard';
import { ProfileCard } from '../ProfileCard/ProfileCard';

interface SlidingOverlayProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  activeNode: APIFamilyTree;
  children?: React.ReactNode;
  activeMovies: APIArtifact[];
  activeArtifacts: APIArtifact[];
  activePhotos: APIArtifact[];
}
export const DemographicsOverlay = (props: SlidingOverlayProps) => {
  const {
    isOpen,
    activeNode,
    setIsOpen,
    activeMovies,
    activeArtifacts,
    activePhotos,
  } = props;
  const photoSrc = getResource(activeNode.id, ResourceTypes.profile);
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
    },
    closed: {
      opacity: 0,
      x: '-100%',
    },
  };

  const CloseButton = () => (
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-0 left-0 mt-2 ml-3">
      <svg
        className="h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  const Overlay = () => (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      className="pb-20 sm:pb-0 fixed right-1 left-0 sm:left-auto bottom-0 top-12 sm:top-3 m-0 sm:mt-10 sm:mb-5 z-20 overflow-y-scroll p-4 rounded-l-lg sm:w-1/2 max-w-xl noscroll text-white"
      style={{
        height: `calc(${Heights.CONTENT} - 10px)`,
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <div className="">
        <CloseButton />
        <div className="h-5" />
        <ProfileCard photoSrc={photoSrc} activeNode={activeNode} />
        {activePhotos.length > 0 ? (
          <Carousel
            type={CarouselType.photo}
            activeNode={activeNode}
            activeArtifact={activePhotos}
          />
        ) : null}
        {activeMovies.length > 0 ? (
          <Carousel
            type={CarouselType.video}
            activeNode={activeNode}
            activeArtifact={activeMovies}
          />
        ) : null}
        {activeArtifacts.length > 0 ? (
          <Carousel
            type={CarouselType.artifact}
            activeNode={activeNode}
            activeArtifact={activeArtifacts}
          />
        ) : null}
        {activeNode.BirthplaceCoords ? (
          <MapCard activeNode={activeNode} birthplace />
        ) : null}
        {activeNode.DeathplaceCoords ? (
          <MapCard activeNode={activeNode} />
        ) : null}
      </div>
    </motion.div>
  );

  return isOpen ? <Overlay /> : null;
};
