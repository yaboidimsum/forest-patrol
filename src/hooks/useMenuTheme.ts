"use client";

import { useEffect, useRef } from "react";

const MENU_SONG_PATH =
  "/assets/songs/Buried Past (Cultists Theme) No, I'm not a Human OST.mp3";

export function useMenuTheme(isPlaying: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MENU_SONG_PATH);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    const audio = audioRef.current;

    const handleInteraction = () => {
      hasInteractedRef.current = true;
      if (isPlaying) {
        audio.play().catch(() => {});
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    if (!hasInteractedRef.current) {
      document.addEventListener("click", handleInteraction);
      document.addEventListener("keydown", handleInteraction);
    }

    if (isPlaying && hasInteractedRef.current) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
}
