export const CircleLogo = () => (
  <div className="flex w-20 h-10 bg-red">
    <img src="/tree.jpg" className="h-10 w-10 rounded-full object-cover"></img>
  </div>
);

export const AnimatedCircleLogo = () => (
  <div className="flex w-10 h-10 bg-red">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-10 w-10 rounded-full object-cover">
      <source src="/iconImage.mp4" type="video/mp4" />
    </video>
  </div>
);
