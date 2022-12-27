import { InfoOverlay } from './InfoOverlay';

export const Photo = ({
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
      <div style={{ height: '500px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={src} className="object-contain h-full w-full" />
      </div>
      <InfoOverlay title="" description={title} />
    </div>
  );
};
