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
      <div className="carousel-caption hidden md:block absolute text-center">
        <h5 className="text-xl">First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
  );
};
