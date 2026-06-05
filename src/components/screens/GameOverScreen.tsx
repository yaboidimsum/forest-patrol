"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";

const endingCopy: Record<string, { title: string; body: string }> = {
  good: {
    title: "Good Ending",
    body: "You identified the killer before the final night. The cabin is safe, for now.",
  },
  "killer-survived": {
    title: "Bad Ending",
    body: "The killer slipped through your hands. Day 5 ends in silence.",
  },
  "cabin-empty": {
    title: "Lonely Ending.",
    body: "You lost everyone. Trust collapsed. There is no one left to question.",
  },
};

export function GameOverScreen() {
  const ending = useGameStore((s) => s.ending);
  const reset = useGameStore((s) => s.reset);
  const copy = ending ? endingCopy[ending] : endingCopy.good;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
        className="w-full max-w-[800px] bg-black/90 backdrop-blur-sm p-6 md:p-10 lg:p-12 text-center panel-depth"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-foreground text-fluid-title leading-tight tracking-tight glow-foreground mb-4 md:mb-8"
        >
          {copy.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-mono text-[#7ab0a4] text-fluid-body leading-snug tracking-tight mb-6 md:mb-12"
        >
          {copy.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <Button onClick={reset} ariaLabel="Return to main menu">
            Return to Menu
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
