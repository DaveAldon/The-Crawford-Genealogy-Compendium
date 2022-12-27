import { useEffect, useState } from 'react';
import { getResource } from '../../lib/resources/resources';
import {
  getArtifactUrl,
  getGalleryUrl,
  getVideoUrl,
} from '../../lib/resources/resources.enum';
import { APIFamilyTree } from '../../types/geneology';
import { CarouselType } from './Carousel';

export const useCarousel = ({
  activeNode,
  type,
}: {
  activeNode: APIFamilyTree;
  type: CarouselType;
}) => {
  const [srcs, setSrcs] = useState<string[]>([]);

  useEffect(() => {
    const tmpSrcs: string[] = [];
    if (type === CarouselType.photo) {
      for (let i = 1; i <= parseInt(activeNode.PhotoGallery); i++) {
        const url = getResource(activeNode.id, getGalleryUrl(i));
        tmpSrcs.push(url);
      }
    }
    if (type === CarouselType.video) {
      for (let i = 1; i <= parseInt(activeNode.MovieGallery); i++) {
        const url = getResource(activeNode.id, getVideoUrl(i));
        tmpSrcs.push(url);
      }
    }
    if (type === CarouselType.artifact) {
      for (let i = 1; i <= parseInt(activeNode.Artifacts); i++) {
        const url = getResource(activeNode.id, getArtifactUrl(i));
        tmpSrcs.push(url);
      }
    }
    if (tmpSrcs.length === 1) tmpSrcs.push(tmpSrcs[0]);
    setSrcs(tmpSrcs);
  }, [activeNode]);

  return {
    srcs,
  };
};
