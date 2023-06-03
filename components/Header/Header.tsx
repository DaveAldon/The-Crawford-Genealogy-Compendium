import Link from 'next/link';
import { Heights } from '../../styles/constants.enum';
import { CircleLogo } from '../Logos/CircleLogo';
import Layout from '../layout';
import MobileMenu from './MobileMenu';

const HeaderLink = ({ href, children }: { href: string; children: string }) => (
  <li>
    <Link
      className="text-white transition hover:text-gray-400 hidden md:inline-block"
      href={href}>
      <p style={{ whiteSpace: 'nowrap' }}>{children}</p>
    </Link>
  </li>
);

export const Header = () => {
  const links = [
    { href: '/', children: 'Home' },
    { href: '/FamilyTree', children: 'Family Tree' },
    { href: '/blog', children: 'Blog' },
    //{ href: '/artifacts', children: 'Artifacts' },
    { href: '/military', children: 'Military' },
    { href: '/about', children: 'About' },
  ];

  const meta = {
    title: 'David Crawford – Software Developer',
    description: `Software Developer, writer, artist, creator.`,
    image:
      'https://media.licdn.com/dms/image/C5616AQFq00SLyxc58g/profile-displaybackgroundimage-shrink_350_1400/0/1630334856455?e=1676505600&v=beta&t=gccUn2DOokwI0SnxDjCu-KGz5xPsnkfN1s9TYi-f5yI',
    type: 'website',
  };

  return (
    <header
      aria-label="Site Header"
      className="font-sans antialiased bg-[#212224] fixed w-full z-50">
      <title>Grand Rapids Developer</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="David Crawford" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@GrandRapidsDev" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
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
    </header>
  );
};
