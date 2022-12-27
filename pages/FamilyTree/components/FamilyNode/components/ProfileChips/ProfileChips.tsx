import { APIFamilyTree } from '../../../../../../types/geneology';

interface Props {
  compendiumReference: APIFamilyTree;
  height: string;
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
    fill={active ? '#34eb95' : 'grey'}
    className="bi bi-image-fill"
    viewBox="0 0 16 16">
    <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
  </svg>
);
const Artifact = ({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={SIZE}
    height={SIZE}
    fill={active ? '#34eb95' : 'grey'}
    className="bi bi-bookmark-heart"
    viewBox="0 0 16 16">
    <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
  </svg>
);
export const ProfileChips = (props: Props) => {
  const { compendiumReference, height } = props;
  return (
    <div
      style={{
        height: height,
        padding: '0px 10px',
        marginBottom: '2px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor: '#1e2124',
      }}>
      <Photo active={compendiumReference.PhotoGallery ? true : false} />
      <div style={{ width: '10px' }} />
      <Video active={compendiumReference.MovieGallery ? true : false} />
      <div style={{ width: '10px' }} />
      <Artifact active={compendiumReference.Artifacts ? true : false} />
    </div>
  );
};
