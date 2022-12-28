import { CircleLogo } from '../Logos/CircleLogo';

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font w-full">
      <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-500">
          <CircleLogo />
          <span className="ml-3 text-xl text-gray-400">
            The Crawford Genealogy Compendium
          </span>
        </a>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2022 David Crawford
        </p>
      </div>
    </footer>
  );
};
