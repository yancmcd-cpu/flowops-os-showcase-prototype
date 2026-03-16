"use client";

import { motion } from "framer-motion";

const REVEAL_TRANSITION = {
  duration: 0.82,
  ease: [0.22, 1, 0.36, 1],
};

export default function RevealSection({ children, className = "", delay = 0, amount = 0.24, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ ...REVEAL_TRANSITION, delay }}
    >
      {children}
    </motion.div>
  );
}
