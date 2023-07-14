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
        <Roadmap />
      </section>
      <Footer />
    </div>
  );
}
