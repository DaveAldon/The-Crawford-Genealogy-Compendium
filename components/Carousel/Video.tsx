import { InfoOverlay } from './InfoOverlay';

export const Video = ({ src, index }: { src: string; index: number }) => {
  return (
    <div
      className={`carousel-item relative float-left w-full ${
        index === 1 ? 'active' : ''
      }`}>
      <div style={{ height: '500px', backgroundColor: 'black' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <video className="object-contain h-full w-full" autoPlay loop muted>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <InfoOverlay title="Video" description="This is a video" />
    </div>
  );
};
