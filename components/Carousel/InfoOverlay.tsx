export const InfoOverlay = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full">
      <div className="bg-black bg-opacity-50 rounded-lg p-2 text-center">
        <p className="bg-opacity-50 rounded-lg">{title}</p>
        <p className="bg-opacity-50 rounded-lg">{description}</p>
      </div>
    </div>
  );
};
