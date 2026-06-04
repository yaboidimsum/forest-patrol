"use client";

import { motion } from "framer-motion";
import type { GamePhase } from "@/types/game";

interface PhaseIndicatorProps {
  day: number;
  phase: GamePhase;
}

export function PhaseIndicator({ day, phase }: PhaseIndicatorProps) {
  const isNight = phase === "night";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute left-4 md:left-8 lg:left-16 top-4 md:top-8 lg:top-16 flex flex-col gap-1"
    >
      <p className="font-mono text-foreground text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-tight whitespace-nowrap glow-foreground">
        DAY-{day}
      </p>
      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="font-mono text-[clamp(0.75rem,2vw,1.25rem)] leading-none tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ color: isNight ? "#6b7280" : "#87dac6" }}
      >
        {isNight ? "\u25C6 NIGHT" : "\u25C8 DAY"}
      </motion.p>
    </motion.div>
  );
}
