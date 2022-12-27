import { APIFamilyTree } from '../../types/geneology';
import { Artifact } from './Artifact';
import { Photo } from './Photo';
import { useCarousel } from './useCarousel';
import { Video } from './Video';

export enum CarouselType {
  artifact = 'artifact',
  photo = 'photo',
  video = 'video',
}
interface Props {
  activeNode: APIFamilyTree;
  type: CarouselType;
}
export const Carousel = (props: Props) => {
  const { type } = props;
  const { srcs } = useCarousel(props);

  return (
    <div
      id={`carousel-id-${type}`}
      className="carousel slide relative mb-3 border-white rounded-lg"
      data-bs-ride="carousel">
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target={`#carousel-id-${type}`}
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"></button>
        <button
          type="button"
          data-bs-target={`#carousel-id-${type}`}
          data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button
          type="button"
          data-bs-target={`#carousel-id-${type}`}
          data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div
        className="carousel-inner relative w-full overflow-hidden rounded-lg"
        style={{
          height: '500px',
        }}>
        {srcs.map((src, i) => {
          switch (type) {
            case CarouselType.artifact:
              return <Artifact src={src} key={i} index={i} />;
            case CarouselType.photo:
              return <Photo src={src} key={i} index={i} />;
            case CarouselType.video:
              return <Video src={src} key={i} index={i} />;
            default:
              return null;
          }
        })}
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target={`#carousel-id-${type}`}
        data-bs-slide="prev">
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target={`#carousel-id-${type}`}
        data-bs-slide="next">
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
