import { InfoOverlay } from './InfoOverlay';

export const Video = ({
  src,
  index,
  title,
}: {
  src: string;
  index: number;
  title: string;
}) => {
  return (
    <div
      className={`carousel-item relative float-left w-full ${
        index === 1 ? 'active' : ''
      }`}>
      <div style={{ height: '500px', backgroundColor: 'black' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <video
          key={src}
          className="object-contain h-full w-full"
          autoPlay
          loop
          muted
          playsInline>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <InfoOverlay title="" description={title} />
    </div>
  );
};
