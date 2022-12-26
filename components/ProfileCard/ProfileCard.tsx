import { hext } from '@davealdon/hext';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useImageFallback } from '../../hooks/useImageFallback/useImageFallback';
import { FallbackResources } from '../../lib/resources/resources.enum';
import { APIFamilyTree } from '../../types/geneology';

interface Props {
  photoSrc: string;
  activeNode: APIFamilyTree;
}
export const ProfileCard = (props: Props) => {
  const { photoSrc, activeNode } = props;
  const name = `${activeNode.Firstname} ${activeNode.Middlename} ${activeNode.Lastname}`;
  const { DOB, Death } = activeNode;
  const fallbackSrc = `${FallbackResources.profile}${activeNode.id}`;
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });

  const getAge = () => {
    const currentDecade = `${dayjs().format('YYYY').slice(0, 3)}0`;

    if (Death) {
      return parseInt(Death.split('/')[2]) - parseInt(DOB.split('/')[2]);
    } else {
      const baseAge = parseInt(currentDecade) - parseInt(DOB.slice(0, -1));
      return `${baseAge - 10}-${baseAge}s`;
    }
  };

  return (
    <div
      style={{
        backgroundColor: hext('#FFFFFF', 10),
      }}
      className="mb-3 rounded-lg shadow-lg">
      <Image
        alt="Home"
        width={640}
        height={480}
        src={imageSrc}
        onError={onError}
        className="h-56 w-full rounded-md object-cover"
      />

      <div className="p-3">
        <dl>
          {/* <div>
            <dt className="sr-only">Price</dt>
            <dd className="text-sm text-gray-500">$240,000</dd>
          </div> */}
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="font-medium">{name}</dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="h-4 w-4 text-white-700"
              viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M8.48 10.901C11.211 10.227 13 7.837 13 5A5 5 0 0 0 3 5c0 2.837 1.789 5.227 4.52 5.901l-.244.487a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.244-.487ZM4.352 3.356a4.004 4.004 0 0 1 3.15-2.325C7.774.997 8 1.224 8 1.5c0 .276-.226.496-.498.542-.95.162-1.749.78-2.173 1.617a.595.595 0 0 1-.52.341c-.346 0-.599-.329-.457-.644Z"
              />
            </svg>

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Born</p>
              <p className="font-medium">{DOB}</p>
            </div>
          </div>

          {Death ? (
            <div className="sm:inline-flex sm:shrink-0 sm:items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-4 w-4 text-white-700"
                viewBox="0 0 16 16">
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
              </svg>

              <div className="mt-1.5 sm:ml-3 sm:mt-0">
                <p className="text-gray-500">Died</p>

                <p className="font-medium">{Death}</p>
              </div>
            </div>
          ) : null}

          <div className="sm:inline-flex sm:shrink-0 sm:items-center">
            <svg
              className="h-4 w-4 text-white-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:ml-3 sm:mt-0">
              <p className="text-gray-500">Age</p>

              <p className="font-medium">{getAge()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
