"use client";

import { motion } from "framer-motion";

interface MusicCreditProps {
  visible: boolean;
  title?: string;
  artist?: string;
}

export function MusicCredit({
  visible,
  title = "Just Asking at Night",
  artist = "Max Specter",
}: MusicCreditProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 pointer-events-none"
    >
      <div className="bg-black/60 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2.5 rounded-sm">
        <p className="font-mono text-foreground/70 text-[10px] md:text-xs tracking-wider uppercase leading-tight">
          <span className="text-foreground/50">Now Playing</span>
        </p>
        <p className="font-mono text-foreground/90 text-[11px] md:text-sm tracking-tight leading-tight mt-0.5">
          {title}
        </p>
        <p className="font-mono text-foreground/50 text-[10px] md:text-xs tracking-tight leading-tight">
          by {artist}
        </p>
      </div>
    </motion.div>
  );
}
