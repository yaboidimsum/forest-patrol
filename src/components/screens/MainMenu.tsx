"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const menuContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MainMenu() {
  const startGame = useGameStore((s) => s.startGame);
  const togglePause = useGameStore((s) => s.togglePause);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-[clamp(2rem,10vh,6rem)] px-4">
      {/* Title at top */}
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className="font-mono text-white text-fluid-title leading-none tracking-tight whitespace-nowrap mt-[clamp(1rem,5vh,4rem)]"
      >
        Forest Patrol
      </motion.h1>

      {/* Subtle tagline */}
      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-mono text-foreground/40 text-fluid-small tracking-widest uppercase mt-4"
      >
        There is something in the forest
      </motion.p> */}

      {/* Menu buttons — horizontal row at bottom */}
      <motion.nav
        variants={menuContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-4 md:gap-[clamp(1rem,4vw,3.8rem)] mb-[clamp(1rem,5vh,4rem)]"
      >
        <motion.div variants={menuItemVariants}>
          <Button
            variant="secondary"
            onClick={startGame}
            ariaLabel="Play Game"
          >
            Play Game
          </Button>
        </motion.div>
        <motion.div variants={menuItemVariants}>
          <Button
            variant="outline"
            onClick={togglePause}
            ariaLabel="Settings"
          >
            Settings
          </Button>
        </motion.div>
        <motion.div variants={menuItemVariants}>
          <Button
            variant="outline"
            onClick={() => window.close()}
            ariaLabel="Exit"
          >
            Exit
          </Button>
        </motion.div>
      </motion.nav>
    </div>
  );
}
