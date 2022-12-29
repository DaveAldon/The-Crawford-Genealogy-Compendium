import Link from 'next/link';
import { Heights } from '../../styles/constants.enum';
import { CircleLogo } from '../Logos/CircleLogo';

const HeaderLink = ({ href, children }: { href: string; children: string }) => (
  <li>
    <Link className="text-white transition hover:text-gray-400" href={href}>
      <p style={{ whiteSpace: 'nowrap' }}>{children}</p>
    </Link>
  </li>
);

export const Header = () => {
  const links = [
    { href: '/', children: 'Home' },
    { href: '/FamilyTree/FamilyTree', children: 'Family Tree' },
    { href: '/about', children: 'About' },
  ];

  return (
    <header aria-label="Site Header" className="bg-[#212224] fixed w-full z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between"
          style={{
            height: Heights.HEADER,
          }}>
          <div className="flex w-100 h-100 bg-red">
            <Link
              className="flex flex-row justify-center items-center gap-4 text-white"
              href="/">
              <>
                <CircleLogo />
                <p className="invisible sm:visible text-white transition hover:text-gray-400 text-sm">
                  The Crawford Genealogy Compendium
                </p>
              </>
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Site Nav" className="block">
              <ul className="flex items-center gap-6 text-sm">
                {links.map((link, i) => (
                  <HeaderLink key={i} href={link.href}>
                    {link.children}
                  </HeaderLink>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
