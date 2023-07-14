import Link from 'next/link';

const Video = () => (
  <div className="max-w-lg w-3/4 md:w-1/2 h-full rounded-md overflow-hidden justify-center flex">
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        backgroundColor: 'red',
        scale: '1.5',
      }}
      className="rounded-md">
      <source src="/homeVideo.mp4" type="video/mp4" />
    </video>
  </div>
);

export const Options = () => {
  return (
    <div className="flex pt-24 flex-col items-center justify-center w-full">
      <Video />
      <div className="max-w-2xl pt-6 flex flex-col md:text-left mb-10 items-center text-center">
        <p className="mb-4 text-gray-400 text-lg mx-4 md:mx-8">
          The Crawford Genealogy Compendium is an effort to curate the Crawford
          family&apos;s history, documents, and artifacts without any barriers
          or paywalls. We believe that anyone who wants to learn about the
          Crawford family&apos;s genealogy should have the ability to access
          this information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
            href="/FamilyTree">
            <span className="justify-center">See the Family Tree</span>
          </Link>
          {/*               <Link
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/artifacts">
                <span className="justify-center">View all Family Photos</span>
              </Link> */}
          <Link
            className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
            href="/military">
            <span className="justify-center">
              See all Military Family Members
            </span>
          </Link>
          <Link
            className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
            href="#roadmap"
            scroll>
            <span className="justify-center">View our Roadmap</span>
          </Link>
          <Link
            className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
            href="/blog"
            scroll>
            <span className="justify-center">Check out our Blog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
