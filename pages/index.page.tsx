import Link from 'next/link';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Roadmap } from '../components/Roadmap/Roadmap';

export default function Home() {
  return (
    <div className="text-black bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 lg:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-10 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl font-semibold items-center xl:w-2/2 text-white">
              We are creating a Crawford genealogy that is open and free
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-400 text-lg">
              The Crawford Genealogy Compendium is an effort to curate the
              Crawford family&apos;s history, documents, and artifacts without
              any barriers or paywalls. We believe that anyone who wants to
              learn about the Crawford family&apos;s genealogy should have the
              ability to access this information.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/FamilyTree/FamilyTree">
                <span className="justify-center">See the Family Tree</span>
              </Link>
              <Link
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="#roadmap"
                scroll>
                <span className="justify-center">View our Roadmap</span>
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
              width={500}
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
        <div id="roadmap" className="grr max-w-7xl mx-auto text-center">
          <h1 className="mb-8 text-6xl font-semibold text-white">
            Current Roadmap
          </h1>
          <h1 className="mb-8 text-xl text-gray-400 text-center">
            Our current goals for this project are below, and will continue to
            expand.
          </h1>
          <Roadmap />
        </div>
      </section>
      <Footer />
    </div>
  );
}
