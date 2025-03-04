import Head from 'next/head';

export const siteTitle = 'Crawford Genealogy';

export default function Layout() {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Crawford Genealogy Compendium" />
      <meta name="theme-color" content="#212224" />
      <meta name="referrer" content="no-referrer" />
      <title>{siteTitle}</title>
    </Head>
  );
}
