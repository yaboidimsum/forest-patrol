"use client";

import { create } from "zustand";
import type { DialogueNode } from "@/types/game";

interface DialogueStore {
  currentText: string;
  fullText: string;
  isTyping: boolean;
  speakerId: string | null;
  history: Array<{ speakerId: string; text: string }>;

  setDialogue: (speakerId: string, node: DialogueNode) => void;
  setFullText: (speakerId: string, text: string) => void;
  setCurrentText: (text: string) => void;
  finishTyping: () => void;
  clear: () => void;
}

export const useDialogueStore = create<DialogueStore>((set) => ({
  currentText: "",
  fullText: "",
  isTyping: false,
  speakerId: null,
  history: [],

  setDialogue: (speakerId, node) =>
    set({
      speakerId,
      fullText: node.text,
      currentText: "",
      isTyping: true,
      history: [...useDialogueStore.getState().history, { speakerId, text: node.text }],
    }),

  setFullText: (speakerId, text) =>
    set({ speakerId, fullText: text, currentText: "", isTyping: true }),

  setCurrentText: (text) => set({ currentText: text, isTyping: text.length < useDialogueStore.getState().fullText.length }),

  finishTyping: () =>
    set((s) => ({ currentText: s.fullText, isTyping: false })),

  clear: () =>
    set({ currentText: "", fullText: "", isTyping: false, speakerId: null }),
}));
