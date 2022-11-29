import { Map as PigeonMap, Marker } from 'pigeon-maps';

interface MapProps {
  coords: string;
  label: string;
}
export const Map = (props: MapProps) => {
  const { coords, label } = props;
  const parsedCoords = coords.split(',').map(Number);
  const mapCoords: [number, number] = [parsedCoords[0], parsedCoords[1]];

  return (
    <div>
      <p>{label}</p>
      <PigeonMap height={300} center={mapCoords} defaultZoom={5}>
        <Marker width={50} anchor={mapCoords} />
      </PigeonMap>
    </div>
  );
};
