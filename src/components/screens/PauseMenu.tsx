"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";

export function PauseMenu() {
  const togglePause = useGameStore((s) => s.togglePause);
  const reset = useGameStore((s) => s.reset);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[60] bg-deep/85 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-black/90 p-6 md:p-10 w-full max-w-[480px] flex flex-col gap-6 md:gap-8 items-center panel-depth"
      >
        <h2 className="font-mono text-foreground text-fluid-title tracking-tight glow-foreground">
          Paused
        </h2>
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <Button onClick={togglePause} fullWidth ariaLabel="Resume">
            Resume
          </Button>
          <Button
            variant="secondary"
            onClick={reset}
            fullWidth
            ariaLabel="Restart"
          >
            Restart
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
