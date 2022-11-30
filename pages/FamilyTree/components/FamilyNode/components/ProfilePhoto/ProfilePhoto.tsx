import Image from 'next/image';

interface Props {
  src: string;
  onError?: () => void;
  alt?: string;
}
export const ProfilePhoto = (props: Props) => {
  const { src, onError, alt } = props;
  return (
    <div
      style={{
        height: '60%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <Image
        alt={alt || ''}
        style={{ objectFit: 'cover' }}
        fill
        sizes="100vw"
        src={src}
        onError={onError}
      />
    </div>
  );
};
