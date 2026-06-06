"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { DialogueBox } from "@/components/ui/DialogueBox";
import { Button } from "@/components/ui/Button";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";

const day1Dialogues = [
  {
    speaker: "Chief",
    text: "Thanks for being here on a short notice.",
  },
  {
    speaker: "Chief",
    text: "As you might have heard, the previous sheriff had an accident while on patrol.",
  },
  {
    speaker: "Chief",
    text: "He is on the town clinic for now, and he should be back in 5 days.",
  },
  {
    speaker: "You",
    text: "What a poor fella.",
  },
  {
    speaker: "Chief",
    text: "Yes, it is unfortunate.",
  },
  {
    speaker: "You",
    text: "So, what will I be doing?",
  },
  {
    speaker: "Chief",
    text: "Your job is to watch the area, day and night.",
  },
  {
    speaker: "Chief",
    text: "There might be hikers here and there who goes into the forest sometimes.",
  },
  {
    speaker: "Chief",
    text: "Keep them safe, and offer shelter when they need it.",
  },
  {
    speaker: "Chief",
    text: "And for you, we can't afford you to have an accident.",
  },
  {
    speaker: "Chief",
    text: "Godspeed, sheriff.",
  },
  {
    speaker: "You",
    text: "Thanks, Chief.",
  },
];

export function PrologueScreen() {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // We use the store to advance
  const advanceToRadio = useGameStore((s) => s.advanceToRadio);

  const dialogue = day1Dialogues[dialogueIdx];

  const handleComplete = () => {
    setIsTyping(false);
  };

  const handleNextDialogue = () => {
    if (isTyping) return; // Wait for typing to finish before advancing
    if (dialogueIdx < day1Dialogues.length - 1) {
      setDialogueIdx((prev) => prev + 1);
      setIsTyping(true);
    } else {
      advanceToRadio();
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center px-4 md:px-8 lg:px-12">
      {/* Background */}
      <img
        src="/assets/images/Background.png"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <PhaseIndicator day={1} phase="day" />

      {/* Tent interior frame */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute left-0 top-0 bottom-0 w-[15vw] max-w-[200px]"
          style={{
            background:
              "linear-gradient(to right, rgba(0,10,7,0.95) 0%, rgba(0,10,7,0.7) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-[15vw] max-w-[200px]"
          style={{
            background:
              "linear-gradient(to left, rgba(0,10,7,0.95) 0%, rgba(0,10,7,0.7) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0 top-0 h-[10vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,10,7,0.9) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-[8vh]"
          style={{
            background:
              "linear-gradient(to top, rgba(0,10,7,0.9) 0%, transparent 100%)",
          }}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(51,43,43,0) 0%, rgba(26,26,25,0.3) 50%, rgba(13,18,16,0.6) 75%, rgba(0,10,7,0.85) 100%)",
        }}
      />

      <div className="flex flex-col gap-4 md:gap-[26px] w-full max-w-[649px] z-30 mt-auto mb-12">
        <div onClick={handleNextDialogue} className="cursor-pointer">
          <AnimatePresence mode="wait">
            <motion.div
              key={dialogueIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <DialogueBox
                speakerName={dialogue.speaker === "System" ? undefined : dialogue.speaker}
                text={dialogue.text}
                onComplete={handleComplete}
                className={dialogue.speaker === "System" ? "text-center text-foreground/70" : ""}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
