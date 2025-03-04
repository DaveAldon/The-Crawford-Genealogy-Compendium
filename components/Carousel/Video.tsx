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
        <iframe
          key={src}
          className="object-contain h-full w-full"
          src={src}
          allow="autoplay; encrypted-media"
          allowFullScreen
          referrerPolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
        {title !== '' ? <InfoOverlay title="" description={title} /> : null}
      </div>
    </div>
  );
};
