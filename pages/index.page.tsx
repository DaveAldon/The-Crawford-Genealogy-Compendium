import Link from 'next/link';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Roadmap } from '../components/Roadmap/Roadmap';
import Subscribe from '../components/Subscribe/Subscribe';
import { Hero } from '../components/Hero/Hero';
import { Letters } from '../components/Hero/Letters';
import { Options } from '../components/Hero/Options';

export default function Home() {
  return (
    <div className="text-black bg-black">
      <Header />
      <section className="text-gray-600 body-font mx-0 md:mx-16">
        <Hero />
        <Letters />
        <Options />
        <div id="roadmap" className="mt-16 max-w-7xl mx-auto text-center">
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
