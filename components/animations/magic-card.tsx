"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
}

export const MagicCard = ({ children, className = "" }: MagicCardProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-secondary/20 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      {children}
    </motion.div>
  );
};
