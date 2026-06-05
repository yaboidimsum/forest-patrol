"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { MainMenu } from "@/components/screens/MainMenu";
import { PrologueScreen } from "@/components/screens/PrologueScreen";
import { WindowTransition } from "@/components/screens/WindowTransition";
import { NightPhase } from "@/components/screens/NightPhase";
import { RadioScreen } from "@/components/screens/RadioScreen";
import { PeopleList } from "@/components/screens/PeopleList";
import { IntegrationScreen } from "@/components/screens/IntegrationScreen";
import { GameOverScreen } from "@/components/screens/GameOverScreen";
import { PauseMenu } from "@/components/screens/PauseMenu";
import { Scanlines } from "@/components/ui/Scanlines";
import { Vignette } from "@/components/ui/Vignette";
import { AtmosphericFog } from "@/components/ui/AtmosphericFog";
import { DustParticles } from "@/components/ui/DustParticles";
import { MusicCredit } from "@/components/ui/MusicCredit";
import { useNightTheme } from "@/hooks/useNightTheme";
import { useMenuTheme } from "@/hooks/useMenuTheme";

const screenTransition = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export default function Page() {
  const screen = useGameStore((s) => s.screen);
  const isPaused = useGameStore((s) => s.isPaused);
  const togglePause = useGameStore((s) => s.togglePause);

  // Theme plays continuously throughout the entire game
  const isThemePlaying = screen !== "menu";
  const isMenuPlaying = screen === "menu";

  useNightTheme(isThemePlaying);
  useMenuTheme(isMenuPlaying);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (screen !== "menu" && screen !== "gameover") {
          togglePause();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, togglePause]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-deep">
      {/* Deep background layers */}
      <img
        src="/assets/images/Background.png"
        alt=""
        aria-hidden
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* Subtle forest-green ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(2,91,69,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fog glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[40vh] z-0 opacity-30"
        style={{
          background:
            "linear-gradient(to top, rgba(2,91,69,0.2) 0%, transparent 100%)",
        }}
      />

      {/* Atmospheric floating fog */}
      <AtmosphericFog />

      {/* Floating dust particles */}
      <DustParticles />

      {/* Noise texture overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[35] noise-overlay opacity-50 mix-blend-overlay" />

      {/* Main content area with CRT curvature */}
      <div className="absolute inset-0 z-10 crt-curve">
        <AnimatePresence>
          <motion.div
            key={screen}
            variants={screenTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="absolute inset-0"
          >
            {screen === "menu" && <MainMenu />}
            {screen === "prologue" && <PrologueScreen />}
            {screen === "window-transition" && <WindowTransition />}
            {screen === "night" && <NightPhase />}
            {screen === "radio" && <RadioScreen />}
            {screen === "people-list" && <PeopleList />}
            {screen === "integration" && <IntegrationScreen />}
            {screen === "gameover" && <GameOverScreen />}
          </motion.div>
        </AnimatePresence>
      </div>

      {isPaused && <PauseMenu />}

      {/* Music credit — shows during gameplay and menu */}
      {isMenuPlaying ? (
        <MusicCredit
          visible={isMenuPlaying}
          title="Buried Past"
          artist="Max Specter"
        />
      ) : (
        <MusicCredit visible={isThemePlaying} />
      )}

      {/* Vignette overlay */}
      <Vignette />

      {/* Scanlines */}
      <Scanlines />
    </main>
  );
}
