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
import { APIFamilyTree } from '../../../../types/geneology';
import { Map } from '../Map/Map';
import { ProfileCard } from '../../../../components/ProfileCard/ProfileCard';

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

  return (
    <SlidingPaneLibrary
      isOpen={isOpen}
      onRequestClose={() => setPanelState(false)}>
      <div className={styles.profileParent}>
        <ProfileCard imageSrc={imageSrc} />
        <BiArrowFromLeft />
        <div
          style={{
            width: '100%',
            height: 300,
            borderRadius: 10,
            position: 'relative',
            overflow: 'hidden',
            border: '5px solid #424549',
          }}>
          <Image
            src={imageSrc}
            style={{ objectFit: 'cover' }}
            fill
            sizes="100vw"
            onError={onError}
            alt="profile photo"
          />
        </div>
        <p>
          {activeNode.Firstname} {activeNode.Middlename} {activeNode.Lastname}
        </p>
        <p>
          Born: {activeNode.DOB}
          {activeNode.Death ? ` - Died: ${activeNode.Death}` : ''}
        </p>
        <Map
          coords={activeNode.BirthplaceCoords}
          label={`Place of Birth: ${activeNode.Birthplace}`}
        />
        {activeNode.Death ? (
          <Map
            coords={activeNode.DeathplaceCoords}
            label={`Place of Death: ${activeNode.Deathplace}`}
          />
        ) : null}
      </div>
    </SlidingPaneLibrary>
  );
};
