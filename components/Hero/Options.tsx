import Link from 'next/link';

export const Options = () => {
  return (
    <div className="max-w-5xl flex pt-24 lg:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 pt-6 flex flex-col md:items-start md:text-left mb-10 items-center text-center">
        <p className="mb-4 text-gray-400 text-lg">
          The Crawford Genealogy Compendium is an effort to curate the Crawford
          family&apos;s history, documents, and artifacts without any barriers
          or paywalls. We believe that anyone who wants to learn about the
          Crawford family&apos;s genealogy should have the ability to access
          this information.
        </p>
        <div className="grid grid-cols-2 gap-4">
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
      <div
        style={{
          transform: 'rotate(8deg)',
          borderRadius: '65% 35% 75% 25% / 29% 32% 68% 71% ',

          overflow: 'hidden',
        }}>
        <video
          height={500}
          width={400}
          autoPlay
          loop
          muted
          playsInline
          style={{
            backgroundColor: 'red',
            scale: '1.4',
          }}>
          <source src="/homeVideo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
