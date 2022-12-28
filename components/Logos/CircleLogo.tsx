import Link from 'next/link';

export const CircleLogo = () => (
  <div className="flex w-100 h-100 bg-red">
    <Link
      className="flex flex-row justify-center items-center gap-4 text-white"
      href="/">
      <img src="/tree.jpg" className="h-10 w-10 rounded-full object-cover" />
    </Link>
  </div>
);

export const AnimatedCircleLogo = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    className="h-10 w-10 rounded-full object-cover">
    <source src="/iconImage.mp4" type="video/mp4" />
  </video>
);
