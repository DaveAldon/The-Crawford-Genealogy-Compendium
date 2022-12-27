export const InfoOverlay = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="carousel-caption absolute text-center">
      <h5 className="text-xl">{title}</h5>
      <p>{description}</p>
    </div>
  );
};
