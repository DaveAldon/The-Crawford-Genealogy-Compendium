import { motion } from 'framer-motion';
import { Heights } from '../../styles/constants.enum';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { AdvancedViewButton } from '../Buttons/AdvancedViewButton';
import { ArtifactCarousel, CarouselType } from '../Carousel/Carousel';
import { MapCard } from '../MapCard/MapCard';
import { ProfileCard } from '../ProfileCard/ProfileCard';

interface SlidingOverlayProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  activeNode: NormalizedFamilyTree;
  children?: React.ReactNode;
  selectedFamily: string;
}
export const DemographicsOverlay = (props: SlidingOverlayProps) => {
  if (!props.activeNode) return null;
  const { isOpen, activeNode, setIsOpen } = props;
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
  const photos = activeNode.metadata.photos;
  const movies = activeNode.metadata.videos;
  const artifacts = activeNode.metadata.artifacts;

  const CloseButton = () => (
    <button
      onClick={() => setIsOpen(false)}
      className="flex flex-row justify-center items-center">
      Close{' '}
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
        <div className="flex flex-row justify-between">
          <AdvancedViewButton
            guid={activeNode.id}
            family={props.selectedFamily}
          />
          <CloseButton />
        </div>
        <div className="h-5" />
        <ProfileCard activeNode={activeNode} />
        {photos.length > 0 ? (
          <ArtifactCarousel
            type={CarouselType.photo}
            activeNode={activeNode}
            activeArtifact={photos}
          />
        ) : null}
        {movies.length > 0 ? (
          <ArtifactCarousel
            type={CarouselType.video}
            activeNode={activeNode}
            activeArtifact={movies}
          />
        ) : null}
        {artifacts.length > 0 ? (
          <ArtifactCarousel
            type={CarouselType.artifact}
            activeNode={activeNode}
            activeArtifact={artifacts}
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
