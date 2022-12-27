export const Photo = ({ src, index }: { src: string; index: number }) => {
  return (
    <div
      className={`carousel-item relative float-left w-full ${
        index === 1 ? 'active' : ''
      }`}>
      <div style={{ height: '500px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={src} className="object-contain h-full w-full" />
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-50"></div>
      </div>
      <div className="carousel-caption hidden md:block absolute text-center">
        <h5 className="text-xl">First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
  );
};
