import Link from 'next/link';

export const CircleLogo = () => (
  <div className="flex w-100 h-100 bg-red">
    <div className="flex flex-row justify-center items-center gap-4 text-white">
      <img
        src="/tree.jpg"
        className="h-10 w-10 rounded-full object-cover"></img>
    </div>
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
