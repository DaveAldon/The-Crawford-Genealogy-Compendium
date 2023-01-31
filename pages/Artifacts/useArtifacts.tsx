import { useState } from 'react';
import { Image } from 'react-grid-gallery';

export const useArtifacts = ({ images }: { images: Image[] }) => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);

  return {
    index,
    currentImage,
    handleClick,
    handleClose,
  };
};
