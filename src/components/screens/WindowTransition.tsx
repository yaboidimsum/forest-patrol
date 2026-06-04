"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";
import { Button } from "@/components/ui/Button";

const nightNarrations = [
  "There are movements in the woods but the nights are so cold...",
  "The trees remember what we forget.",
  "It watches through the glass. Don't look.",
];

const dawnNarrations = [
  "Dawn breaks through the canopy. The forest is quiet... for now.",
  "Morning fog rolls in. The creature retreats to the shadows.",
  "Light finds its way through the pines. Another night survived.",
];

export function WindowTransition() {
  const day = useGameStore((s) => s.day);
  const phase = useGameStore((s) => s.phase);
  const advanceToNight = useGameStore((s) => s.advanceToNight);
  const advanceToRadio = useGameStore((s) => s.advanceToRadio);
  const [narration, setNarration] = useState("");

  useEffect(() => {
    const pool = phase === "night" ? nightNarrations : dawnNarrations;
    setNarration(pool[Math.floor(Math.random() * pool.length)]);
  }, [day, phase]);

  const next = () => {
    if (phase === "night") {
      advanceToNight();
    } else {
      advanceToRadio();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Morning / Night scenery visible through the tent opening */}
      <AnimatePresence mode="wait">
        <motion.img
          key={phase}
          src={
            phase === "night"
              ? "/assets/images/OutsideViewNight.png"
              : "/assets/images/OutsideViewMorning.png"
          }
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Phase label top-left */}
      <PhaseIndicator day={day} phase={phase} />

      {/* Tent interior frame — dark side panels simulating tent walls */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Left tent wall */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[15vw] max-w-[200px]"
          style={{
            background:
              "linear-gradient(to right, rgba(0,10,7,0.95) 0%, rgba(0,10,7,0.7) 50%, transparent 100%)",
          }}
        />
        {/* Right tent wall */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[15vw] max-w-[200px]"
          style={{
            background:
              "linear-gradient(to left, rgba(0,10,7,0.95) 0%, rgba(0,10,7,0.7) 50%, transparent 100%)",
          }}
        />
        {/* Top tent flap */}
        <div
          className="absolute left-0 right-0 top-0 h-[10vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,10,7,0.9) 0%, transparent 100%)",
          }}
        />
        {/* Bottom tent edge */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[8vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,10,7,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Radial gradient vignette for atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(51,43,43,0) 0%, rgba(26,26,25,0.3) 50%, rgba(13,18,16,0.6) 75%, rgba(0,10,7,0.85) 100%)",
        }}
      />

      {/* Subtle animated overlay */}
      <motion.div
        className="absolute inset-0 z-20 mix-blend-overlay bg-foreground/5 pointer-events-none"
        animate={{ opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom center content: narration + button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 w-full max-w-[90vw] md:max-w-[800px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${day}-${phase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="w-full"
          >
            <div className="bg-black/90 p-4 md:p-6 text-center">
              <p className="font-mono text-foreground text-[clamp(1rem,2.5vw,2.25rem)] leading-tight tracking-tight">
                {narration}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <Button onClick={next} ariaLabel="Continue">
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
