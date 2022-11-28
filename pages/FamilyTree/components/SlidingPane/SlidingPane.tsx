import SlidingPaneLibrary from 'react-sliding-pane';
import Image from 'next/image';
import { getResource } from '../../../../lib/resources/resources';
import {
  FallbackResources,
  ResourceTypes,
} from '../../../../lib/resources/resources.enum';
import { useImageFallback } from '../../../../hooks/useImageFallback/useImageFallback';
import { BiArrowFromLeft } from 'react-icons/bi';
import styles from './SlidingPane.module.css';
import { Map, Marker } from 'pigeon-maps';
import { APIFamilyTree } from '../../../../types/geneology';

interface SlidingPaneProps {
  isOpen: boolean;
  activeNode: APIFamilyTree;
  setPanelState: (state: boolean) => void;
}
export const SlidingPane = (props: SlidingPaneProps) => {
  const { isOpen, activeNode, setPanelState } = props;
  const photoSrc = getResource(activeNode.id, ResourceTypes.profile);
  const fallbackSrc = `${FallbackResources.profile}${activeNode.id}`;
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });
  const parsedBirthplacecoords = activeNode.Birthplace.split(',').map(Number);
  const birthplaceCoords: [number, number] = [
    parsedBirthplacecoords[0],
    parsedBirthplacecoords[1],
  ];

  return (
    <SlidingPaneLibrary
      className="slide-pane"
      isOpen={isOpen}
      width="400px"
      onRequestClose={() => setPanelState(false)}>
      <div className={styles.profileParent}>
        <BiArrowFromLeft />
        <Image
          src={imageSrc}
          onError={onError}
          alt="profile photo"
          width={200}
          height={200}
        />
        <p>
          {activeNode.Firstname} {activeNode.Middlename} {activeNode.Lastname}
        </p>
        {birthplaceCoords.length === 2 ? (
          <Map height={300} center={birthplaceCoords} defaultZoom={11}>
            <Marker width={50} anchor={birthplaceCoords} />
          </Map>
        ) : null}
      </div>
    </SlidingPaneLibrary>
  );
};
