import { useEffect, useState } from 'react';

export const useImageFallback = ({
  photoSrc,
  fallbackSrc,
}: {
  photoSrc?: string;
  fallbackSrc: string;
}) => {
  const [imageSrc, setImageSrc] = useState(photoSrc || fallbackSrc);

  useEffect(() => {
    setImageSrc(photoSrc || fallbackSrc);
  }, [photoSrc, fallbackSrc]);

  const onError = () => {
    setImageSrc(fallbackSrc);
  };

  return {
    imageSrc,
    onError,
  };
};
