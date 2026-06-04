"use client";

import { useCharacterPortrait } from "@/hooks/useCharacterPortrait";

interface PortraitProps {
  seed: number;
  className?: string;
}

export function Portrait({ seed, className }: PortraitProps) {
  const palette = useCharacterPortrait(seed);
  return (
    <div
      className={className}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${palette.skin} 0%, ${palette.skinDark} 60%, #000 100%)`,
      }}
      aria-hidden
    />
  );
}
