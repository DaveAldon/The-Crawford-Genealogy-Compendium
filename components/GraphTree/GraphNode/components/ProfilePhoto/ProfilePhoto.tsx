interface Props {
  src: string;
  onError?: () => void;
  alt?: string;
  height?: string | number;
  width?: string | number;
}
export const ProfilePhoto = (props: Props) => {
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
        referrerPolicy="no-referrer"
        alt={props.alt || ''}
        style={{
          objectFit: 'cover',
          height: props.height || 125,
          width: props.width || 100,
          overflow: 'hidden',
        }}
        src={props.src}
      />
    </div>
  );
};
