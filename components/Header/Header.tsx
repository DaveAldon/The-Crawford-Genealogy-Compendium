import Link from 'next/link';
import { Heights } from '../../styles/constants.enum';
import { CircleLogo } from '../Logos/CircleLogo';
import Layout from '../layout';
import MobileMenu from './MobileMenu';
import { useRouter } from 'next/router';
import Head from 'next/head';

const HeaderLink = ({ href, children }: { href: string; children: string }) => (
  <li>
    <Link
      className="text-white transition hover:text-gray-400 hidden md:inline-block"
      href={href}>
      <p style={{ whiteSpace: 'nowrap' }}>{children}</p>
    </Link>
  </li>
);

interface HeaderProps {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}
export const Header = (props: HeaderProps) => {
  const router = useRouter();

  const links = [
    { href: '/', children: 'Home' },
    { href: '/FamilyTree', children: 'Family Tree' },
    { href: '/blog', children: 'Blog' },
    //{ href: '/artifacts', children: 'Artifacts' },
    { href: '/military', children: 'Military' },
    { href: '/about', children: 'About' },
  ];

  const meta = {
    title: props.title || 'Crawford Lineage',
    slug: (props.slug && `/blog/${props.slug}`) || '',
    description: props.description || 'Learn about the Crawford family history',
    image:
      props.image ||
      'https://drive.google.com/uc?export=view&id=1Faihll0srUah4ffCzoPJrrxp1DKbmYYr',
    type: 'website',
  };

  return (
    <Head aria-label="Site Header">
      {/*       <!-- HTML Meta Tags -->
       */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />

      {/* <!-- Google / Search Engine Tags -->
       */}
      <meta itemProp="name" content={meta.title} />
      <meta itemProp="description" content={meta.description} />
      <meta itemProp="image" content={meta.image} />

      {/* <!-- Facebook Meta Tags -->
       */}
      <meta
        property="og:url"
        content={`https://crawfordlineage.com${meta.slug}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      {/* <!-- Twitter Meta Tags -->
       */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="AI can never tell you your great-great-grandfather's story"
      />
      <meta name="twitter:description" content="Published 2023-06-03" />
      <meta name="twitter:image" content={meta.image} />

      <Layout />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between"
          style={{
            height: Heights.HEADER,
          }}>
          <div className="flex w-10 h-100 bg-red">
            <Link
              className="flex flex-row justify-center items-center gap-4 text-white"
              href="/">
              <CircleLogo />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" className="block">
              <ul className="flex items-center gap-6 text-sm w-full">
                {links.map((link, i) => (
                  <HeaderLink key={i} href={link.href}>
                    {link.children}
                  </HeaderLink>
                ))}
                <MobileMenu />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Head>
  );
};
