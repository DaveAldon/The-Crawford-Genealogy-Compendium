'use client';
import React from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';

export default function Cars() {
  return (
    <div className="text-black flex flex-col justify-between bg-black">
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <>
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
                Cars
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Cars show up in the background of many old family photos. What
                kind of cars were they? There&rsquo;s always a car enthusiast
                somewhere in the family, and this is precisely where their
                knowledge can directly contribute to genealogy.
              </p>
            </div>
            <div className="flex flex-wrap -m-4"></div>
          </>
        </div>
      </section>
      <Footer />
    </div>
  );
}
