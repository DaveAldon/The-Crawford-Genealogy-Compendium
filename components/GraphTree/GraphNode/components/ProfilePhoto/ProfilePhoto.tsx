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
      <img
        alt={alt || ''}
        style={{ objectFit: 'cover' }}
        sizes="100%"
        height={100}
        width={100}
        src={src}
      />
    </div>
  );
};
