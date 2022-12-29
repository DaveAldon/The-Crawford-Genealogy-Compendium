import { Map as PigeonMap, Marker } from 'pigeon-maps';

interface MapProps {
  coords: string;
}
export const Map = (props: MapProps) => {
  const { coords } = props;
  const parsedCoords = coords.split(',').map(Number);
  const mapCoords: [number, number] = [parsedCoords[0], parsedCoords[1]];

  return (
    <div className="[&>*]:rounded-lg">
      <PigeonMap
        height={300}
        center={mapCoords}
        defaultZoom={5}
        twoFingerDrag={true}
        metaWheelZoom={true}>
        <Marker width={50} anchor={mapCoords} />
      </PigeonMap>
    </div>
  );
};
