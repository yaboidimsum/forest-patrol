"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getRadioEvent, radioEvents } from "@/data/events";
import { Button } from "@/components/ui/Button";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";

export function RadioScreen() {
  const day = useGameStore((s) => s.day);
  const advanceToPeopleList = useGameStore((s) => s.advanceToPeopleList);
  const setLastRadioIndex = useGameStore((s) => s.setLastRadioIndex);

  const dayEvents = radioEvents.filter((e) => e.day === day);
  const [index, setIndex] = useState(0);
  const [scrambled, setScrambled] = useState("");

  const event = getRadioEvent(day, index);

  useEffect(() => {
    if (!event) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setScrambled(event.transcript.slice(0, i));
      if (i >= event.transcript.length) {
        window.clearInterval(id);
      }
    }, 18);
    return () => window.clearInterval(id);
  }, [event]);

  const onNext = () => {
    if (index < dayEvents.length - 1) {
      const next = index + 1;
      setIndex(next);
      setLastRadioIndex(next);
    } else {
      advanceToPeopleList();
    }
  };

  if (!event) {
    return (
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <PhaseIndicator day={day} phase="day" />
        <Button onClick={advanceToPeopleList} ariaLabel="Continue">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4 md:px-8 py-8">
      <PhaseIndicator day={day} phase="day" />

      {/* Radio visualization — left side on desktop, rises from bottom */}
      <motion.div
        initial={{ opacity: 0, y: 120, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative w-[60vw] max-w-[480px] md:max-w-[580px] lg:max-w-[720px] aspect-[3/4] lg:aspect-[2/3] self-end shrink-0 lg:-mb-8"
        aria-hidden
      >
        <img
          src="/assets/images/Radio.png"
          alt=""
          className="absolute inset-0 w-full h-full object-contain object-bottom"
        />
      </motion.div>

      {/* Radio transcript — right side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-[500px] lg:max-w-[463px] bg-black/80 backdrop-blur-sm p-4 md:p-6 lg:p-[60px] panel-depth"
      >
        <p className="font-mono text-foreground text-fluid-body leading-tight tracking-tight">
          {scrambled}
          <motion.span
            className="inline-block w-[0.4em] h-[1em] align-middle bg-foreground ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </p>
        <p className="font-mono text-muted-fg text-fluid-small mt-4 md:mt-6 tracking-tight">
          Creature note: {event.creatureDescription}
        </p>
      </motion.div>

      {/* Bottom controls */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6">
        <p className="font-mono text-muted-fg text-fluid-small">
          Broadcast {index + 1} / {dayEvents.length}
        </p>
        <Button
          onClick={onNext}
          ariaLabel={index < dayEvents.length - 1 ? "Next broadcast" : "Continue"}
        >
          {index < dayEvents.length - 1 ? "Next" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
