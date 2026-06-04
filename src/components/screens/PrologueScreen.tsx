"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";

const prologueSlides = [
  {
    image: "/assets/images/Prologue-1.png",
    text: `The National Park of **(REDACTED)** is under emergency lockdown. Unexplained disappearances. No patterns. No answers.`,
  },
  {
    image: "/assets/images/Prologue-2.png",
    text: `You are stationed at a remote ranger post. Help those who are lost in the woods`,
  },
];

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function PrologueScreen() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const advanceToWindowTransition = useGameStore(
    (s) => s.advanceToWindowTransition,
  );

  const slide = prologueSlides[slideIdx];

  useEffect(() => {
    setTyped("");
    setIsTyping(true);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      const next = slide.text.slice(0, i);
      setTyped(next);
      if (i >= slide.text.length) {
        window.clearInterval(id);
        setIsTyping(false);
      }
    }, 18);
    return () => window.clearInterval(id);
  }, [slideIdx, slide.text]);

  const handleClick = useCallback(() => {
    if (isTyping) {
      setTyped(slide.text);
      setIsTyping(false);
      return;
    }
    if (slideIdx < prologueSlides.length - 1) {
      setSlideIdx((s) => s + 1);
    } else {
      advanceToWindowTransition();
    }
  }, [isTyping, slide.text, slideIdx, advanceToWindowTransition]);

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onClick={handleClick}
      role="button"
      aria-label="Continue"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      {/* Background images — layered absolutely for smooth crossfade */}
      <AnimatePresence initial={false}>
        <motion.img
          key={slideIdx}
          src={slide.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

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

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(51,43,43,0) 0%, rgba(26,26,25,0.3) 50%, rgba(13,18,16,0.6) 75%, rgba(0,10,7,0.85) 100%)",
        }}
      />

      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 z-20 mix-blend-overlay bg-foreground/5 pointer-events-none"
        animate={{ opacity: [0.03, 0.1, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text content */}
      <div className="absolute bottom-[clamp(4rem,12vh,8rem)] left-1/2 -translate-x-1/2 z-30 w-full max-w-[90vw] md:max-w-[800px] flex flex-col items-center gap-4">
        <motion.div
          key={slideIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/90 p-5 md:p-7 w-full"
        >
          <p className="font-mono text-foreground text-[clamp(0.9rem,2.2vw,1.35rem)] leading-relaxed tracking-tight whitespace-pre-line">
            <RichText text={typed} />
            {isTyping && (
              <motion.span
                className="inline-block w-[0.5em] h-[1em] bg-current ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )}
          </p>
        </motion.div>

        {/* Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-black/90 px-6 py-2"
        >
          <motion.p
            className="font-mono text-foreground/70 text-[clamp(0.75rem,1.5vw,1.1rem)] leading-tight tracking-tight text-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Click to continue
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
