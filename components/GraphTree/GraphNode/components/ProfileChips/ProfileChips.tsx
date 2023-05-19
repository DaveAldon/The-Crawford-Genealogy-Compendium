interface Props {
  hasMovies: boolean;
  hasPhotos: boolean;
  hasMilitary: boolean;
  height: string | number;
}
const SIZE = 12;

const Video = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={SIZE}
    height={SIZE}
    fill={active ? '#34eb95' : 'grey'}
    className="bi bi-camera-reels-fill"
    viewBox="0 0 16 16">
    <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
  </svg>
);
const Photo = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={SIZE}
    height={SIZE}
    fill={active ? '#d742f5' : 'grey'}
    className="bi bi-image-fill"
    viewBox="0 0 16 16">
    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
  </svg>
);
const Military = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={SIZE}
    height={SIZE}
    fill={active ? '#eff542' : 'grey'}
    className="bi bi-award-fill"
    viewBox="0 0 16 16">
    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
  </svg>
);
export const ProfileChips = (props: Props) => {
  const { height, hasMovies, hasMilitary, hasPhotos } = props;
  return (
    <div
      style={{
        height: height,
        padding: '0px 5px',
        marginBottom: '2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Photo active={hasPhotos} />
      <div style={{ width: '15px' }} />
      <Video active={hasMovies} />
      <div style={{ width: '15px' }} />
      <Military active={hasMilitary} />
    </div>
  );
};
