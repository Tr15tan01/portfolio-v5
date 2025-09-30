"use client";

import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sacred Geometry Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 38.2% 38.2%, rgba(139, 92, 246, 0.3) 0%, transparent 61.8%)",
            "radial-gradient(circle at 61.8% 61.8%, rgba(168, 85, 247, 0.25) 0%, transparent 61.8%)",
            "radial-gradient(circle at 38.2% 61.8%, rgba(192, 132, 252, 0.2) 0%, transparent 61.8%)",
            "radial-gradient(circle at 61.8% 38.2%, rgba(147, 51, 234, 0.35) 0%, transparent 61.8%)",
            "radial-gradient(circle at 38.2% 38.2%, rgba(139, 92, 246, 0.3) 0%, transparent 61.8%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Golden Ratio Flower of Life */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Central Circle */}
        <motion.div
          className="absolute w-32 h-32 border-2 border-purple-400/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* First Ring - 6 Circles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-purple-300/20 rounded-full"
            style={{
              transform: `rotate(${i * 60}deg) translateX(64px) rotate(-${
                i * 60
              }deg)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Fibonacci Spiral */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-full h-full">
          {[1, 1, 2, 3, 5, 8, 13].map((size, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-purple-400/20 rounded-full"
              style={{
                width: `${size * 16}px`,
                height: `${size * 16}px`,
                top: i % 2 === 0 ? "0" : "auto",
                left: i % 2 === 0 ? "0" : "auto",
                right: i % 2 === 1 ? "0" : "auto",
                bottom: i % 2 === 1 ? "0" : "auto",
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Metatron's Cube */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative w-full h-full">
          {/* Outer Circle */}
          <motion.div
            className="absolute inset-0 border border-purple-300/15 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner Lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-px h-1/2 bg-purple-400/20 origin-top"
              style={{
                transform: `rotate(${i * 30}deg)`,
              }}
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Sacred Geometry Orbs */}
      <motion.div
        className="absolute top-1/5 right-1/5 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/5 left-1/5 w-6 h-6 bg-gradient-to-tr from-violet-400 to-purple-500 rounded-full shadow-lg"
        animate={{
          y: [0, 25, 0],
          scale: [1, 1.4, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Golden Ratio Rectangles */}
      <motion.div
        className="absolute top-10 left-10 w-52 h-32 border-2 border-purple-300/20"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-32 h-52 border-2 border-purple-300/20"
        animate={{
          scale: [1, 1.08, 1],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Vesica Piscis */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-40 h-40"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute w-40 h-40 border-2 border-purple-400/25 rounded-full"
          style={{
            clipPath: "inset(0 50% 0 0)",
          }}
        />
        <div
          className="absolute w-40 h-40 border-2 border-purple-400/25 rounded-full"
          style={{
            clipPath: "inset(0 0 0 50%)",
            left: "-50%",
          }}
        />
      </motion.div>

      {/* Sacred Geometry Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 161px, rgba(139, 92, 246, 0.1) 161px, rgba(139, 92, 246, 0.1) 162px, transparent 162px),
              linear-gradient(transparent 161px, rgba(139, 92, 246, 0.1) 161px, rgba(139, 92, 246, 0.1) 162px, transparent 162px)
            `,
            backgroundSize: "261.8px 261.8px" /* Golden ratio */,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "261.8px 261.8px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Phi Ratio Lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Diagonal Golden Ratio Lines */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(45deg, transparent 0%, transparent 38.2%, rgba(139, 92, 246, 0.1) 38.2%, rgba(139, 92, 246, 0.1) 61.8%, transparent 61.8%)`,
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(-45deg, transparent 0%, transparent 38.2%, rgba(168, 85, 247, 0.1) 38.2%, rgba(168, 85, 247, 0.1) 61.8%, transparent 61.8%)`,
          }}
        />
      </motion.div>

      {/* Sacred Geometry Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          style={{
            top: `${38.2 + i * 5.236}%` /* Golden angle increments */,
            left: `${61.8 - i * 3.82}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 0.8, 0.3],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};
