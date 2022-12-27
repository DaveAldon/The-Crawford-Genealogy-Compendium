import { useEffect, useState } from 'react';
import { getResource } from '../../lib/resources/resources';
import { getGalleryUrl, getVideoUrl } from '../../lib/resources/resources.enum';
import { APIFamilyTree } from '../../types/geneology';

export const VideoGallery = ({ activeNode }: { activeNode: APIFamilyTree }) => {
  const [videoSrcs, setVideoSrcs] = useState<string[]>([]);

  useEffect(() => {
    const srcs: string[] = [];
    console.log(activeNode.id);
    (async () => {
      for (let i = 1; i <= parseInt(activeNode.MovieGallery); i++) {
        const url = getResource(activeNode.id, getVideoUrl(i));
        srcs.push(url);
      }
    })();
    setVideoSrcs(srcs);
  }, [activeNode]);

  const Video = ({ src, index }: { src: string; index: number }) => {
    return (
      <div
        className={`carousel-item relative float-left w-full ${
          index === 1 ? 'active' : ''
        }`}>
        <div style={{ height: '500px' }}>
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

  return (
    <div
      id="carouselVideoCaptions"
      className="carousel slide relative mb-3 border-white rounded-lg"
      data-bs-ride="carousel">
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselVideoCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"></button>
        <button
          type="button"
          data-bs-target="#carouselVideoCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button
          type="button"
          data-bs-target="#carouselVideoCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div
        className="carousel-inner relative w-full overflow-hidden rounded-lg"
        style={{
          height: '500px',
        }}>
        {videoSrcs.map((src, i) => (
          <Video src={src} key={i} index={i} />
        ))}
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselVideoCaptions"
        data-bs-slide="prev">
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselVideoCaptions"
        data-bs-slide="next">
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
