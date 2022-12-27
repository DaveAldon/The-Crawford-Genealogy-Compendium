import { motion } from 'framer-motion';
import { getResource } from '../../lib/resources/resources';
import { ResourceTypes } from '../../lib/resources/resources.enum';
import { Heights } from '../../styles/constants.enum';
import { APIFamilyTree } from '../../types/geneology';
import { Artifacts } from '../Artifacts/Artifacts';
import { Carousel, CarouselType } from '../Carousel/Carousel';
import { Gallery } from '../Gallery/Gallery';
import { MapCard } from '../MapCard/MapCard';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { VideoGallery } from '../VideoGallery/VideoGallery';

interface SlidingOverlayProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  activeNode: APIFamilyTree;
  children?: React.ReactNode;
}
export const DemographicsOverlay = (props: SlidingOverlayProps) => {
  const { isOpen, activeNode, setIsOpen } = props;
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
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  const Overlay = () => (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      className="noscroll fixed right-0 bottom-0 mt-10 mb-5 mr-5 z-10 overflow-y-scroll p-4 rounded-l-lg"
      style={{
        height: `calc(${Heights.CONTENT} - 70px)`,
        borderRadius: '10px',
        width: '50%',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <div className="">
        <CloseButton />
        <div className="h-5" />
        <ProfileCard photoSrc={photoSrc} activeNode={activeNode} />
        <Carousel type={CarouselType.photo} activeNode={activeNode} />
        <Carousel type={CarouselType.artifact} activeNode={activeNode} />
        {/* {activeNode.PhotoGallery ? <Gallery activeNode={activeNode} /> : null}
        {activeNode.MovieGallery ? (
          <VideoGallery activeNode={activeNode} />
        ) : null}
        {activeNode.Artifacts ? <Artifacts activeNode={activeNode} /> : null} */}
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
