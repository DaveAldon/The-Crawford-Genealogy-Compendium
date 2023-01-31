import { useEffect, useState } from 'react';
import { APIArtifact, APIFamilyTree } from '../../types/genealogy';
import { CarouselType } from './Carousel';

interface SourceData {
  src: string;
  title: string;
}

export const useCarousel = ({
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
          tmpSrcs.push({
            src: activeArtifact[i - 1].url,
            title: activeArtifact[i - 1].description,
          });
        }
      }
    }
    if (type === CarouselType.video) {
      if (activeArtifact) {
        for (let i = 1; i <= activeArtifact.length; i++) {
          tmpSrcs.push({
            src: activeArtifact[i - 1].url,
            title: activeArtifact[i - 1].description,
          });
        }
      }
    }
    if (type === CarouselType.artifact) {
      if (activeArtifact) {
        for (let i = 1; i <= activeArtifact.length; i++) {
          tmpSrcs.push({
            src: activeArtifact[i - 1].url,
            title: activeArtifact[i - 1].description,
          });
        }
      }
    }
    if (tmpSrcs.length === 1) tmpSrcs.push(tmpSrcs[0]);
    setSrcs([...tmpSrcs]);
  }, [activeArtifact]);

  return {
    srcs,
  };
};
