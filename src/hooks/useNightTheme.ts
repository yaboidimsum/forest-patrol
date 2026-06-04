"use client";

import { useEffect, useRef, useCallback } from "react";

const SONG_PATH = "/assets/songs/Just Asking at Night (Night Theme I) No, I'm not a Human OST.mp3";

export function useNightTheme(isPlaying: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // Create audio element once
    if (!audioRef.current) {
      audioRef.current = new Audio(SONG_PATH);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
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

    // Wait for user interaction before playing (browser autoplay policy)
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

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const fadeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.pause();
        audio.volume = 0.6; // Reset for next time
        clearInterval(fadeInterval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { fadeOut };
}
