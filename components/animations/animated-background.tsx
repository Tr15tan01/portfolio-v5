"use client";

export const AnimatedBackground = () => {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static gradient base - zero cost, no animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20" />

      {/* Two soft orbs. GPU-cheap (transform/opacity only), paused entirely
          for users who prefer reduced motion via the CSS below. */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      {/* Subtle static grid, no animation at all */}
      <div className="bg-grid" />

      <style jsx>{`
        .bg-orb {
          position: absolute;
          border-radius: 9999px;
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.25),
            rgba(168, 85, 247, 0.25)
          );
          filter: blur(40px);
          will-change: transform;
        }

        .orb-1 {
          top: 15%;
          right: 10%;
          width: 260px;
          height: 260px;
          animation: drift-1 16s ease-in-out infinite;
        }

        .orb-2 {
          bottom: 10%;
          left: 8%;
          width: 220px;
          height: 220px;
          animation: drift-2 18s ease-in-out infinite;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: linear-gradient(
              90deg,
              transparent 161px,
              rgba(139, 92, 246, 0.4) 161px,
              rgba(139, 92, 246, 0.4) 162px,
              transparent 162px
            ),
            linear-gradient(
              transparent 161px,
              rgba(139, 92, 246, 0.4) 161px,
              rgba(139, 92, 246, 0.4) 162px,
              transparent 162px
            );
          background-size: 261.8px 261.8px;
        }

        @keyframes drift-1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.08);
          }
        }

        @keyframes drift-2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -15px) scale(1.06);
          }
        }

        @media (max-width: 768px) {
          .bg-orb {
            filter: blur(24px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-orb {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
