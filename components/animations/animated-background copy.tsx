// // "use client";

// // import { motion } from "framer-motion";

// // export const AnimatedBackground = () => {
// //   return (
// //     <div className="fixed inset-0 -z-10 overflow-hidden">
// //       <motion.div
// //         className="absolute -inset-[10px] opacity-50"
// //         animate={{
// //           background: [
// //             "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
// //             "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
// //             "radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
// //             "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
// //           ],
// //         }}
// //         transition={{
// //           duration: 10,
// //           repeat: Infinity,
// //           ease: "linear",
// //         }}
// //       />

// //       {/* Floating shapes */}
// //       <motion.div
// //         className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-xl"
// //         animate={{
// //           x: [0, 100, 0],
// //           y: [0, -50, 0],
// //         }}
// //         transition={{
// //           duration: 20,
// //           repeat: Infinity,
// //           ease: "easeInOut",
// //         }}
// //       />

// //       <motion.div
// //         className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-xl"
// //         animate={{
// //           x: [0, -100, 0],
// //           y: [0, 50, 0],
// //         }}
// //         transition={{
// //           duration: 25,
// //           repeat: Infinity,
// //           ease: "easeInOut",
// //         }}
// //       />
// //     </div>
// //   );
// // };

// "use client";

// import { motion } from "framer-motion";

// export const AnimatedBackground = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* 3D Animated Gradient Background */}
//       <motion.div
//         className="absolute inset-0"
//         animate={{
//           background: [
//             "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
//             "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
//             "radial-gradient(circle at 40% 80%, rgba(192, 132, 252, 0.4) 0%, transparent 50%)",
//             "radial-gradient(circle at 60% 30%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)",
//             "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
//           ],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       />

//       {/* 3D Floating Purple Spheres */}
//       <motion.div
//         className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
//         animate={{
//           x: [0, 120, 0],
//           y: [0, -80, 0],
//           scale: [1, 1.3, 1],
//           rotateX: [0, 45, 0],
//           rotateY: [0, 90, 0],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <motion.div
//         className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-violet-500/15 to-purple-600/15 blur-3xl"
//         animate={{
//           x: [0, -150, 0],
//           y: [0, 60, 0],
//           scale: [1, 1.4, 1],
//           rotateX: [0, -30, 0],
//           rotateY: [0, -120, 0],
//         }}
//         transition={{
//           duration: 25,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 2,
//         }}
//       />

//       {/* 3D Rotating Cubes */}
//       <motion.div
//         className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 backdrop-blur-sm"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           rotateX: [0, 360, 0],
//           rotateY: [0, 180, 360],
//           rotateZ: [0, 90, 0],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <motion.div
//         className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-gradient-to-tr from-violet-400/15 to-purple-500/15 backdrop-blur-sm"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           rotateX: [0, -360, 0],
//           rotateY: [0, -270, 0],
//           rotateZ: [0, -45, 0],
//           scale: [1, 0.8, 1],
//         }}
//         transition={{
//           duration: 15,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       {/* 3D Floating Particles */}
//       <motion.div
//         className="absolute top-20 left-20 w-6 h-6 bg-purple-300 rounded-full"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           x: [0, 100, 0],
//           y: [0, -50, 0],
//           z: [0, 50, 0],
//           scale: [1, 1.5, 1],
//           opacity: [0.3, 0.8, 0.3],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       <motion.div
//         className="absolute bottom-20 right-20 w-4 h-4 bg-pink-300 rounded-full"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           x: [0, -80, 0],
//           y: [0, 40, 0],
//           z: [0, -30, 0],
//           scale: [1, 2, 1],
//           opacity: [0.4, 0.9, 0.4],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1,
//         }}
//       />

//       {/* 3D Morphing Blob */}
//       <motion.div
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           borderRadius: [
//             "30% 70% 70% 30% / 30% 30% 70% 70%",
//             "60% 40% 30% 70% / 60% 30% 70% 40%",
//             "40% 60% 70% 30% / 40% 50% 60% 50%",
//             "30% 70% 70% 30% / 30% 30% 70% 70%",
//           ],
//           rotateX: [0, 45, 0, -45, 0],
//           rotateY: [0, 90, 180, 270, 360],
//           scale: [1, 1.2, 0.9, 1.1, 1],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* 3D Floating Pyramid */}
//       <motion.div
//         className="absolute top-10 right-10 w-24 h-24"
//         style={{
//           transformStyle: "preserve-3d",
//           clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
//         }}
//         animate={{
//           rotateX: [0, 360, 0],
//           rotateY: [0, 180, 360],
//           y: [0, -30, 0],
//           scale: [1, 1.3, 1],
//         }}
//         transition={{
//           duration: 18,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       >
//         <div className="w-full h-full bg-gradient-to-b from-purple-400/20 to-pink-400/20" />
//       </motion.div>

//       {/* 3D Floating Cylinder */}
//       <motion.div
//         className="absolute bottom-10 left-10 w-20 h-32"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           rotateX: [0, 45, 0],
//           rotateY: [0, 360, 0],
//           y: [0, 20, 0],
//           scale: [1, 1.2, 1],
//         }}
//         transition={{
//           duration: 16,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.5,
//         }}
//       >
//         <div className="w-full h-full bg-gradient-to-t from-violet-400/15 to-purple-500/15 rounded-full" />
//       </motion.div>

//       {/* 3D Wave Effect */}
//       <motion.div
//         className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/10 to-transparent"
//         style={{
//           transformStyle: "preserve-3d",
//         }}
//         animate={{
//           scaleY: [1, 1.5, 1],
//           rotateX: [0, 10, 0],
//           opacity: [0.3, 0.7, 0.3],
//         }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* 3D Perspective Grid */}
//       <div className="absolute inset-0 opacity-5">
//         <motion.div
//           className="w-full h-full"
//           style={{
//             backgroundImage: `
//               linear-gradient(90deg, transparent 79px, rgba(139, 92, 246, 0.3) 79px, rgba(139, 92, 246, 0.3) 81px, transparent 81px),
//               linear-gradient(transparent 79px, rgba(139, 92, 246, 0.3) 79px, rgba(139, 92, 246, 0.3) 81px, transparent 81px)
//             `,
//             backgroundSize: "100px 100px",
//             transform: "perspective(500px) rotateX(60deg)",
//           }}
//           animate={{
//             backgroundPosition: ["0px 0px", "100px 100px"],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />
//       </div>
//     </div>
//   );
// };
