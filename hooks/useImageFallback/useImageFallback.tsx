import { useState } from 'react';

export const useImageFallback = ({
  photoSrc,
  fallbackSrc,
}: {
  photoSrc?: string;
  fallbackSrc: string;
}) => {
  const [imageSrc, setImageSrc] = useState(photoSrc || fallbackSrc);

  const onError = () => {
    if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
  };

  return {
    imageSrc,
    onError,
  };
};
