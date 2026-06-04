"use client";

import { motion } from "framer-motion";

export function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[50]"
    >
      {/* Horizontal scanlines */}
      <div className="absolute inset-0 scanline-overlay opacity-50" />
      {/* Vertical scanlines */}
      <div className="absolute inset-0 scanline-h opacity-30" />
      {/* Traveling scanline beam */}
      <motion.div
        className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
        initial={{ y: "-5%" }}
        animate={{ y: "105%" }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}
