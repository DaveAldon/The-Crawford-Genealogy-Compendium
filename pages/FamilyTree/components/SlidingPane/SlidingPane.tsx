import SlidingPaneLibrary from 'react-sliding-pane';
import Image from 'next/image';
import { getResource } from '../../../../lib/resources/resources';
import {
  FallbackResources,
  ResourceTypes,
} from '../../../../lib/resources/resources.enum';
import { useImageFallback } from '../../../../hooks/useImageFallback/useImageFallback';
import styles from './SlidingPane.module.css';
import { APIFamilyTree } from '../../../../types/geneology';
import { Map } from '../../../../components/Map/Map';
import { ProfileCard } from '../../../../components/ProfileCard/ProfileCard';
import { MapCard } from '../../../../components/MapCard/MapCard';

interface SlidingPaneProps {
  isOpen: boolean;
  activeNode: APIFamilyTree;
  setPanelState: (state: boolean) => void;
}
export const SlidingPane = (props: SlidingPaneProps) => {
  const { isOpen, activeNode, setPanelState } = props;
  const photoSrc = getResource(activeNode.id, ResourceTypes.profile);

  return (
    <SlidingPaneLibrary
      isOpen={isOpen}
      onRequestClose={() => setPanelState(false)}>
      <div className={styles.profileParent}>
        <ProfileCard photoSrc={photoSrc} activeNode={activeNode} />
        <MapCard activeNode={activeNode} birthplace />
        {activeNode.Death ? <MapCard activeNode={activeNode} /> : null}
      </div>
    </SlidingPaneLibrary>
  );
};
