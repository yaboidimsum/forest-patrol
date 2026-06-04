"use client";

const palettes = [
  { skin: "#3a4a3a", skinDark: "#1a2a1a" },
  { skin: "#4a3a2a", skinDark: "#2a1a0a" },
  { skin: "#3a3a4a", skinDark: "#1a1a2a" },
  { skin: "#5a4a3a", skinDark: "#3a2a1a" },
  { skin: "#2a3a2a", skinDark: "#0a1a0a" },
  { skin: "#4a4a3a", skinDark: "#2a2a1a" },
  { skin: "#3a2a2a", skinDark: "#1a0a0a" },
  { skin: "#3a3a3a", skinDark: "#1a1a1a" },
];

export const useCharacterPortrait = (seed: number) => {
  const idx = Math.abs(Math.floor(seed)) % palettes.length;
  return palettes[idx];
};
