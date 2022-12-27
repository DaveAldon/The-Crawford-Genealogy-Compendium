import { useEffect, useState } from 'react';
import { getResource } from '../../lib/resources/resources';
import {
  getArtifactUrl,
  getGalleryUrl,
  getVideoUrl,
} from '../../lib/resources/resources.enum';
import { APIArtifact, APIFamilyTree } from '../../types/geneology';
import { CarouselType } from './Carousel';

interface SourceData {
  src: string;
  title: string;
}

export const useCarousel = ({
  activeNode,
  activeArtifact,
  type,
}: {
  activeNode: APIFamilyTree;
  activeArtifact: APIArtifact[];
  type: CarouselType;
}) => {
  const [srcs, setSrcs] = useState<SourceData[]>([]);

  useEffect(() => {
    const tmpSrcs: SourceData[] = [];
    if (type === CarouselType.photo) {
      if (activeArtifact) {
        for (let i = 1; i <= activeArtifact.length; i++) {
          const url = getResource(activeNode.id, getGalleryUrl(i));
          tmpSrcs.push({
            src: url,
            title: activeArtifact[i - 1].title,
          });
        }
      }
    }
    if (type === CarouselType.video) {
      if (activeArtifact) {
        for (let i = 1; i <= activeArtifact.length; i++) {
          const url = getResource(activeNode.id, getVideoUrl(i));
          tmpSrcs.push({
            src: url,
            title: activeArtifact[i - 1].title,
          });
        }
      }
    }
    if (type === CarouselType.artifact) {
      if (activeArtifact) {
        for (let i = 1; i <= activeArtifact.length; i++) {
          const url = getResource(activeNode.id, getArtifactUrl(i));
          tmpSrcs.push({
            src: url,
            title: activeArtifact[i - 1].title,
          });
        }
      }
    }
    if (tmpSrcs.length === 1) tmpSrcs.push(tmpSrcs[0]);
    setSrcs(tmpSrcs);
  }, [activeNode]);

  return {
    srcs,
  };
};
