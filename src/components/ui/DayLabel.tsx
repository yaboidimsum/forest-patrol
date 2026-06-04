"use client";

import { motion } from "framer-motion";

interface DayLabelProps {
  day: number;
}

export function DayLabel({ day }: DayLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute left-4 md:left-8 lg:left-16 top-4 md:top-8 lg:top-16 font-mono text-foreground text-[clamp(1.5rem,4vw,3rem)] leading-none tracking-tight whitespace-nowrap glow-foreground"
    >
      DAY-{day}
    </motion.p>
  );
}
