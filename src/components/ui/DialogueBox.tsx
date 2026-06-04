"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface DialogueBoxProps {
  text: string;
  speakerName?: string;
  showGhostLetMeIn?: boolean;
  className?: string;
  speed?: number;
  onComplete?: () => void;
}

export function DialogueBox({
  text,
  speakerName,
  showGhostLetMeIn = false,
  className,
  speed = 28,
  onComplete,
}: DialogueBoxProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
        onCompleteRef.current?.();
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  const skip = () => {
    if (done) return;
    setDisplayed(text);
    setDone(true);
    onCompleteRef.current?.();
  };

  return (
    <div
      onClick={skip}
      className={cn(
        "relative bg-black/90 backdrop-blur-sm text-foreground p-4 md:p-6 lg:p-8 w-full max-w-[649px] min-h-[180px] md:min-h-[240px] lg:min-h-[307px] cursor-pointer select-none panel-depth",
        className,
      )}
      role="region"
      aria-label={speakerName ? `${speakerName} speaking` : "Dialogue"}
    >
      {/* {showGhostLetMeIn && (
        <span
          aria-hidden
          className="ghost-text absolute left-1/2 -translate-x-1/2 top-[55%] text-[clamp(2rem,6vw,3rem)] font-mono text-foreground/15 whitespace-nowrap select-none pointer-events-none"
        >
          LET ME IN
        </span>
      )} */}
      {speakerName && (
        <p className="font-mono text-foreground/60 text-[clamp(0.875rem,1.8vw,1.5rem)] tracking-tight mb-2 uppercase">
          {speakerName}
        </p>
      )}
      <p className="font-mono text-foreground text-[clamp(1.125rem,2.8vw,2.5rem)] leading-tight tracking-tight">
        {displayed}
        <AnimatePresence>
          {!done && (
            <motion.span
              key="cursor"
              className="inline-block w-[0.4em] h-[1em] align-middle bg-foreground ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>
      </p>
    </div>
  );
}
