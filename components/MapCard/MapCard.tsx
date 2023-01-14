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
            <dd className="font-medium flex flex-row items-center">
              <svg
                className="h-4 fill-current text-black-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{' '}
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
