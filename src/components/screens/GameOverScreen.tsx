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
    title: "Coward's Ending",
    body: "You lost everyone. Trust collapsed. There is no one left to question.",
  },
};

const emptyCabinShame: Record<number, { subtitle: string }> = {
  0: {
    subtitle:
      "You turned away every survivor. Alone in the dark, you have no witnesses, no information, and no one to blame but yourself. The forest does not forgive cowards.",
  },
  1: {
    subtitle:
      "You admitted survivors, then cast them all out. Desperate to avoid choosing, you chose nothing. A sheriff who protects no one is worse than the killer they fear.",
  },
};

export function GameOverScreen() {
  const ending = useGameStore((s) => s.ending);
  const reset = useGameStore((s) => s.reset);
  const peopleAdmittedCount = useGameStore((s) => s.peopleAdmittedCount);
  const copy = ending ? endingCopy[ending] : endingCopy.good;

  const isEmptyCabin = ending === "cabin-empty";
  const shameKey = peopleAdmittedCount > 0 ? 1 : 0;
  const shame = isEmptyCabin ? emptyCabinShame[shameKey] : null;

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
          className="font-mono text-[#7ab0a4] text-fluid-body leading-snug tracking-tight mb-4 md:mb-6"
        >
          {copy.body}
        </motion.p>
        {shame && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-mono text-[#c0392b] text-fluid-body leading-snug tracking-tight mb-6 md:mb-12"
          >
            {shame.subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <Button onClick={reset} ariaLabel="Return to main menu">
            Return to Menu
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
