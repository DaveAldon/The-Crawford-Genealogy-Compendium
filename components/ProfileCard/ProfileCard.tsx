import { hext } from '@davealdon/hext';
import Image from 'next/image';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { getAge } from '../../utils/age';

interface Props {
  activeNode: NormalizedFamilyTree;
}
export const ProfileCard = (props: Props) => {
  const { activeNode } = props;
  const name = `${activeNode.Firstname} ${activeNode.Middlename} ${activeNode.Lastname}`;
  const { DOB, Death } = activeNode;
  const profilePicture = activeNode.metadata.profile[0].link;
  const militaryService = activeNode.military
    ? `${activeNode.military?.branch}`
    : '';

  return (
    <div
      style={{
        backgroundColor: hext('#FFFFFF', 10),
        height: 350,
      }}
      className="mb-3 rounded-lg shadow-lg relative flex justify-center">
      <div className="rounded-md overflow-hidden absolute left-0 h-56 w-full">
        <img
          referrerPolicy="no-referrer"
          alt=""
          style={{
            height: '100%',
            width: '100%',
          }}
          className="rounded-md object-cover blur-md"
          src={profilePicture}
        />
      </div>
      <img
        referrerPolicy="no-referrer"
        alt="Profile picture"
        className="h-56 object-contain absolute"
        src={profilePicture}
      />
      <div className="p-3 absolute bottom-0">
        <dl>
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="font-medium">{name.replace(' null', ' ')}</dd>
          </div>
        </dl>

        <div className="flex flex-row gap-2 md:gap-8 text-xs">
          <div className="inline-flex shrink-0 items-center gap-0 md:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="h-4 w-4 text-white-700"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M8.48 10.901C11.211 10.227 13 7.837 13 5A5 5 0 0 0 3 5c0 2.837 1.789 5.227 4.52 5.901l-.244.487a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.244-.487ZM4.352 3.356a4.004 4.004 0 0 1 3.15-2.325C7.774.997 8 1.224 8 1.5c0 .276-.226.496-.498.542-.95.162-1.749.78-2.173 1.617a.595.595 0 0 1-.52.341c-.346 0-.599-.329-.457-.644Z"
              />
            </svg>

            <div className="mt-1.5 ml-1 mt-0">
              <p className="text-gray-500">Born</p>
              <p className="font-medium">{DOB}</p>
            </div>
          </div>

          {Death ? (
            <div className="inline-flex shrink-0 items-center gap-0 md:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="h-4 w-4 text-white-700"
                viewBox="0 0 16 16">
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
              </svg>

              <div className="mt-1.5 ml-1 mt-0">
                <p className="text-gray-500">Died</p>

                <p className="font-medium">{Death}</p>
              </div>
            </div>
          ) : null}

          <div className="inline-flex shrink-0 items-center gap-0 md:gap-2">
            <svg
              className="h-4 w-4 text-white-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 ml-1 mt-0">
              <p className="text-gray-500">Age</p>
              <p className="font-medium">{getAge({ DOB, Death })}</p>
            </div>
          </div>
          {militaryService ? (
            <div className="inline-flex shrink-0 items-center gap-0 md:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-award-fill"
                viewBox="0 0 16 16">
                <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
              </svg>

              <div className="mt-1.5 ml-1 mt-0">
                <p className="text-gray-500">Military Service</p>
                <p className="font-medium">{militaryService}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
