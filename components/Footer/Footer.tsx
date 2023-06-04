import { CircleLogo } from '../Logos/CircleLogo';
import dayjs from 'dayjs';

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font w-full bg-black">
      <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
        <CircleLogo />
        <span className="ml-3 text-xl text-gray-400">
          The Crawford Genealogy Compendium
        </span>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          {`© ${dayjs().format('YYYY')} The Crawford Genealogy Compendium`}
        </p>
      </div>
    </footer>
  );
};
