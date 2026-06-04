import { getCharacterById, characters } from "@/data/characters";
import type { ChainLink } from "@/types/game";

export const verifyKillerGuess = (suspectId: string): boolean => {
  const suspect = getCharacterById(suspectId);
  return suspect?.isKiller ?? false;
};

export const isAnyChainContradiction = (links: ChainLink[]): boolean =>
  links.some(
    (link) =>
      link.fromId === "zen" &&
      link.toId === "isabel" &&
      characters.find((c) => c.id === "zen")?.unreliable === false,
  );

export const evaluateEnding = (
  cabinSize: number,
  day: number,
  maxDays: number,
  killerSurvived: boolean,
  killerRevealed: boolean,
): "good" | "killer-survived" | "cabin-empty" => {
  if (cabinSize === 0) return "cabin-empty";
  if (day > maxDays && killerSurvived) return "killer-survived";
  if (killerRevealed) return "good";
  return "good";
};
