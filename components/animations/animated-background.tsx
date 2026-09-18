/** Pure CSS ambient background (styles in globals.css). Server component: zero JS shipped. */
export const AnimatedBackground = () => (
  <div className="ambient" aria-hidden="true">
    <div className="ambient__blob ambient__blob--1" />
    <div className="ambient__blob ambient__blob--2" />
    <div className="ambient__grid" />
  </div>
);
