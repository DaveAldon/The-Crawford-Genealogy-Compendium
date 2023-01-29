import { useState } from 'react';
import { Image } from 'react-grid-gallery';

export const useArtifacts = ({ images }: { images: Image[] }) => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const prevIndex = (index + images.length - 1) % images.length;

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);

  return {
    index,
    currentImage,
    handleClick,
    handleClose,
  };
};
