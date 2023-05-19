import { Artifact } from '../../types/artifacts.d';
import { APIFamilyTree } from '../../types/genealogy';
import { Photo } from './Photo';
import { Video } from './Video';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export enum CarouselType {
  artifact = 'artifact',
  photo = 'photo',
  video = 'video',
}
interface Props {
  activeNode: APIFamilyTree;
  activeArtifact: Artifact[];
  type: CarouselType;
}
export const ArtifactCarousel = (props: Props) => {
  const { type } = props;

  return (
    <Swiper
      style={{
        width: '100%',
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      pagination={{
        type: 'progressbar',
      }}
      navigation={true}>
      {props.activeArtifact.map((artifact, index) => {
        switch (type) {
          case CarouselType.video:
            return (
              <SwiperSlide
                style={{
                  color: 'red',
                  backgroundColor: 'black',
                }}
                key={index}>
                <Video
                  src={artifact.link}
                  index={index}
                  title={artifact.description}
                />
              </SwiperSlide>
            );
          default:
            return (
              <SwiperSlide key={index}>
                <Photo
                  src={artifact.link}
                  index={index}
                  title={artifact.description}
                />
              </SwiperSlide>
            );
        }
      })}
    </Swiper>
  );
};
