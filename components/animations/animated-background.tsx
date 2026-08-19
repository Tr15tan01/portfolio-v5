"use client";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-container" aria-hidden="true">
      {/* Base wash - zero animation cost */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 via-transparent to-indigo-950/10" />

      {/* Aurora blobs - screen-blended for a layered glow where they overlap.
          Only transform/opacity animate, so these stay GPU-cheap. */}
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      {/* Faint static grid for depth, no animation */}
      <div className="bg-grid" />

      {/* Vignette so the aurora fades at the edges instead of hard-clipping */}
      <div className="vignette" />

      <style jsx>{`
        .bg-container {
          contain: strict;
        }

        .aurora {
          position: absolute;
          border-radius: 9999px;
          mix-blend-mode: screen;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .aurora-1 {
          top: -10%;
          left: 5%;
          width: 480px;
          height: 480px;
          background: radial-gradient(
            circle,
            rgba(168, 85, 247, 0.35) 0%,
            rgba(168, 85, 247, 0) 70%
          );
          filter: blur(50px);
          animation: drift-1 26s ease-in-out infinite;
        }

        .aurora-2 {
          top: 30%;
          right: -5%;
          width: 420px;
          height: 420px;
          background: radial-gradient(
            circle,
            rgba(236, 72, 153, 0.28) 0%,
            rgba(236, 72, 153, 0) 70%
          );
          filter: blur(55px);
          animation: drift-2 32s ease-in-out infinite;
        }

        .aurora-3 {
          bottom: -10%;
          left: 25%;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.3) 0%,
            rgba(99, 102, 241, 0) 70%
          );
          filter: blur(50px);
          animation: drift-3 29s ease-in-out infinite;
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

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 40%,
            transparent 40%,
            var(--surface-0, rgba(0, 0, 0, 0.15)) 100%
          );
          opacity: 0.5;
        }

        @keyframes drift-1 {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(40px, 30px, 0) scale(1.1);
          }
          66% {
            transform: translate3d(-20px, 50px, 0) scale(0.95);
          }
        }

        @keyframes drift-2 {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-50px, -30px, 0) scale(1.12);
          }
        }

        @keyframes drift-3 {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          40% {
            transform: translate3d(30px, -40px, 0) scale(1.08);
          }
          75% {
            transform: translate3d(-30px, -10px, 0) scale(0.96);
          }
        }

        /* Low-end / small screens: cheaper blur, drop the third blob entirely */
        @media (max-width: 768px) {
          .aurora {
            filter: blur(30px) !important;
          }
          .aurora-3 {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
