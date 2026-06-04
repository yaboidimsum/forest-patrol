"use client";

import { useEffect, useState } from "react";
import { useDialogueStore } from "@/store/dialogueStore";

export function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const setCurrentText = useDialogueStore((s) => s.setCurrentText);
  const finishTyping = useDialogueStore((s) => s.finishTyping);

  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      const next = text.slice(0, i);
      setDisplayed(next);
      setCurrentText(next);
      if (i >= text.length) {
        window.clearInterval(id);
        finishTyping();
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, setCurrentText, finishTyping]);

  return displayed;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}
