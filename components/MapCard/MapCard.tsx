import { hext } from '@davealdon/hext';
import Link from 'next/link';
import { APIFamilyTree } from '../../types/geneology';
import { Map } from '../Map/Map';

interface Props {
  activeNode: APIFamilyTree;
  birthplace?: boolean;
}
export const MapCard = (props: Props) => {
  const { activeNode, birthplace } = props;
  const birthplaceNormalised = `- ${activeNode.Birthplace}` || '';
  const deathplaceNormalised = `- ${activeNode.Deathplace}` || '';
  return (
    // border line around it
    <div
      style={{
        backgroundColor: hext('#FFFFFF', 10),
      }}
      className="mb-3 rounded-lg shadow-lg">
      <Map
        coords={
          birthplace ? activeNode.BirthplaceCoords : activeNode.DeathplaceCoords
        }
      />
      <div className="p-3 pt-2">
        <dl>
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="font-medium">
              Place of{' '}
              {birthplace
                ? `Birth ${birthplaceNormalised}`
                : `Death ${deathplaceNormalised}`}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
