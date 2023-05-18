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
        objectFit: 'cover',
      }}>
      <img
        alt={alt || ''}
        style={{
          objectFit: 'cover',
          height: 125,
          width: 100,
          overflow: 'hidden',
        }}
        src={src}
      />
    </div>
  );
};
