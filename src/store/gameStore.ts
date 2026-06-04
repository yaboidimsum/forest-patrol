"use client";

import { create } from "zustand";
import type {
  CabinOccupant,
  EndingType,
  GamePhase,
  GameScreen,
  NightVisitor,
} from "@/types/game";
import {
  generateFullSchedule,
  getNightQueue,
  type FullSchedule,
} from "@/data/schedule";

interface GameStore {
  screen: GameScreen;
  phase: GamePhase;
  day: number;
  maxDays: number;
  nightVisitorIndex: number;
  currentVisitorId: string | null;
  selectedCharacterId: string | null;
  isPaused: boolean;
  ending: EndingType | null;
  cabin: CabinOccupant[];
  nightQueue: NightVisitor[];
  fullSchedule: FullSchedule;
  killerRevealed: boolean;
  killerSurvived: boolean;
  lastRadioIndex: number;

  setScreen: (screen: GameScreen) => void;
  startGame: () => void;
  togglePause: () => void;
  loadNight: () => void;
  nextVisitor: () => void;
  setVisitorOutcome: (outcome: "let-in" | "turned-away") => void;
  admitCurrent: () => void;
  turnAwayCurrent: () => void;
  finishNight: () => void;
  advanceToWindowTransition: () => void;
  advanceToNight: () => void;
  advanceToRadio: () => void;
  advanceToPeopleList: () => void;
  advanceToIntegration: (id: string) => void;
  kickFromCabin: (id: string) => void;
  finishDay: () => void;
  endGame: (ending: EndingType) => void;
  reset: () => void;
  markLinkRevealed: (id: string, linkIds: string[]) => void;
  revealKiller: () => void;
  setLastRadioIndex: (n: number) => void;
}

const initialSchedule = generateFullSchedule();
const initialQueue = getNightQueue(initialSchedule, 1);

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "menu",
  phase: "night",
  day: 1,
  maxDays: 5,
  nightVisitorIndex: 0,
  currentVisitorId: initialQueue[0]?.characterId ?? null,
  selectedCharacterId: null,
  isPaused: false,
  ending: null,
  cabin: [],
  nightQueue: initialQueue,
  fullSchedule: initialSchedule,
  killerRevealed: false,
  killerSurvived: false,
  lastRadioIndex: 0,

  setScreen: (screen) => set({ screen }),

  startGame: () => {
    const freshSchedule = generateFullSchedule();
    set({
      screen: "prologue",
      phase: "night",
      day: 1,
      nightVisitorIndex: 0,
      currentVisitorId: getNightQueue(freshSchedule, 1)[0]?.characterId ?? null,
      cabin: [],
      nightQueue: getNightQueue(freshSchedule, 1),
      fullSchedule: freshSchedule,
      killerRevealed: false,
      killerSurvived: false,
      ending: null,
      lastRadioIndex: 0,
    });
  },

  advanceToWindowTransition: () => {
    set({ screen: "window-transition" });
  },

  togglePause: () =>
    set((s) => ({
      isPaused: !s.isPaused,
      screen: s.isPaused
        ? s.phase === "night"
          ? "night"
          : "people-list"
        : "pause",
    })),

  loadNight: () => {
    const { day, fullSchedule } = get();
    const queue = getNightQueue(fullSchedule, day);
    set({
      nightQueue: queue,
      nightVisitorIndex: 0,
      currentVisitorId: queue[0]?.characterId ?? null,
    });
  },

  nextVisitor: () => {
    const { nightVisitorIndex, nightQueue } = get();
    const next = nightVisitorIndex + 1;
    if (next >= nightQueue.length) {
      set({ currentVisitorId: null });
      return;
    }
    set({
      nightVisitorIndex: next,
      currentVisitorId: nightQueue[next].characterId,
    });
  },

  setVisitorOutcome: (outcome) => {
    const { nightVisitorIndex, nightQueue } = get();
    const queue = [...nightQueue];
    if (queue[nightVisitorIndex]) {
      queue[nightVisitorIndex] = { ...queue[nightVisitorIndex], outcome };
      set({ nightQueue: queue });
    }
  },

  admitCurrent: () => {
    const { day, currentVisitorId, cabin } = get();
    if (!currentVisitorId) return;

    // Always record the outcome so finishNight can proceed
    get().setVisitorOutcome("let-in");

    if (cabin.find((c) => c.characterId === currentVisitorId)) return;
    set({
      cabin: [
        ...cabin,
        {
          characterId: currentVisitorId,
          joinedOnDay: day,
          status: "inside",
          revealedLinkIds: [],
        },
      ],
    });
  },

  turnAwayCurrent: () => {
    get().setVisitorOutcome("turned-away");
  },

  finishNight: () => {
    const { nightQueue } = get();
    const allDone = nightQueue.every((v) => v.outcome !== "pending");
    if (!allDone) return;
    set({ screen: "window-transition", phase: "day" });
  },

  advanceToNight: () => {
    set({ screen: "night", phase: "night" });
  },

  advanceToRadio: () => {
    set({ screen: "radio", phase: "day" });
  },

  advanceToPeopleList: () => {
    set({ screen: "people-list", currentVisitorId: null });
  },

  advanceToIntegration: (id) => {
    set({ screen: "integration", selectedCharacterId: id });
  },

  kickFromCabin: (id) => {
    const { cabin } = get();
    set({
      cabin: cabin.map((c) =>
        c.characterId === id ? { ...c, status: "kicked" } : c,
      ),
      screen: "people-list",
      selectedCharacterId: null,
    });
  },

  markLinkRevealed: (_id, linkIds) => {
    const { selectedCharacterId, cabin } = get();
    if (!selectedCharacterId) return;
    set({
      cabin: cabin.map((c) =>
        c.characterId === selectedCharacterId
          ? {
              ...c,
              revealedLinkIds: Array.from(
                new Set([...c.revealedLinkIds, ...linkIds]),
              ),
            }
          : c,
      ),
    });
  },

  finishDay: () => {
    const { day, maxDays, cabin } = get();
    const cleanedCabin = cabin.filter((c) => c.status === "inside");

    if (day >= maxDays) {
      if (cleanedCabin.length === 0) {
        set({ screen: "gameover", ending: "cabin-empty" });
        return;
      }
      const killerInside = cleanedCabin.some((c) => c.characterId === "isabel");
      if (killerInside && !get().killerRevealed) {
        set({
          screen: "gameover",
          ending: "killer-survived",
          killerSurvived: true,
        });
        return;
      }
      set({ screen: "gameover", ending: "good" });
      return;
    }

    const nextDay = day + 1;
    const { fullSchedule } = get();
    const nextQueue = getNightQueue(fullSchedule, nextDay);
    set({
      day: nextDay,
      phase: "night",
      screen: "window-transition",
      cabin: cleanedCabin,
      nightQueue: nextQueue,
      nightVisitorIndex: 0,
      currentVisitorId: nextQueue[0]?.characterId ?? null,
      lastRadioIndex: 0,
    });
  },

  revealKiller: () => {
    set({ killerRevealed: true });
  },

  endGame: (ending) => set({ ending, screen: "gameover" }),

  setLastRadioIndex: (n) => set({ lastRadioIndex: n }),

  reset: () => {
    const freshSchedule = generateFullSchedule();
    set({
      screen: "menu",
      phase: "night",
      day: 1,
      nightVisitorIndex: 0,
      currentVisitorId: getNightQueue(freshSchedule, 1)[0]?.characterId ?? null,
      selectedCharacterId: null,
      isPaused: false,
      ending: null,
      cabin: [],
      nightQueue: getNightQueue(freshSchedule, 1),
      fullSchedule: freshSchedule,
      killerRevealed: false,
      killerSurvived: false,
      lastRadioIndex: 0,
    });
  },
}));
