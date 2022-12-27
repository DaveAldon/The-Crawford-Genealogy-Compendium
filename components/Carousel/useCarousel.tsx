import { useEffect, useState } from 'react';
import { getResource } from '../../lib/resources/resources';
import {
  getArtifactUrl,
  getGalleryUrl,
  getVideoUrl,
} from '../../lib/resources/resources.enum';
import { APIFamilyTree } from '../../types/geneology';
import { CarouselType } from './Carousel';

interface SourceData {
  src: string;
  title: string;
}

export const useCarousel = ({
  activeNode,
  type,
}: {
  activeNode: APIFamilyTree;
  type: CarouselType;
}) => {
  const [srcs, setSrcs] = useState<SourceData[]>([]);

  useEffect(() => {
    const tmpSrcs: SourceData[] = [];
    if (type === CarouselType.photo) {
      const photos = activeNode.PhotoGallery.split(',').reverse();
      for (let i = 1; i <= photos.length; i++) {
        const url = getResource(activeNode.id, getGalleryUrl(i));
        tmpSrcs.push({
          src: url,
          title: photos[i - 1].trim(),
        });
      }
    }
    if (type === CarouselType.video) {
      const movies = activeNode.MovieGallery.split(',').reverse();
      for (let i = 1; i <= movies.length; i++) {
        const url = getResource(activeNode.id, getVideoUrl(i));
        tmpSrcs.push({
          src: url,
          title: movies[i - 1],
        });
      }
    }
    if (type === CarouselType.artifact) {
      const artifacts = activeNode.Artifacts.split(',').reverse();
      for (let i = 1; i <= artifacts.length; i++) {
        const url = getResource(activeNode.id, getArtifactUrl(i));
        tmpSrcs.push({
          src: url,
          title: artifacts[i - 1],
        });
      }
    }
    if (tmpSrcs.length === 1) tmpSrcs.push(tmpSrcs[0]);
    setSrcs(tmpSrcs);
  }, [activeNode]);

  return {
    srcs,
  };
};
