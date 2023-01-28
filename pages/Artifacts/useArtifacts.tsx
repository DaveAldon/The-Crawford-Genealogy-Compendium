import { useState } from 'react';
import { Image } from 'react-grid-gallery';

export const useArtifacts = ({ images }: { images: Image[] }) => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return {
    index,
    currentImage,
    nextImage,
    prevImage,
    handleClick,
    handleClose,
    handleMovePrev,
    handleMoveNext,
  };
};
