"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getCharacterById } from "@/data/characters";
import { DialogueBox } from "@/components/ui/DialogueBox";
import { Button } from "@/components/ui/Button";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";
import { CharacterPortrait } from "@/components/ui/CharacterPortrait";

export function NightPhase() {
  const currentVisitorId = useGameStore((s) => s.currentVisitorId);
  const day = useGameStore((s) => s.day);
  const admitCurrent = useGameStore((s) => s.admitCurrent);
  const turnAwayCurrent = useGameStore((s) => s.turnAwayCurrent);
  const nextVisitor = useGameStore((s) => s.nextVisitor);
  const finishNight = useGameStore((s) => s.finishNight);
  const nightQueue = useGameStore((s) => s.nightQueue);

  const character = useMemo(
    () => (currentVisitorId ? getCharacterById(currentVisitorId) : undefined),
    [currentVisitorId],
  );

  const [doorDialogueIndex, setDoorDialogueIndex] = useState(0);
  const [showAdmitReaction, setShowAdmitReaction] = useState(false);
  const [showTurnAwayReaction, setShowTurnAwayReaction] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showChoices, setShowChoices] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setDoorDialogueIndex(0);
    setShowAdmitReaction(false);
    setShowTurnAwayReaction(false);
    setCountdown(3);
    setShowChoices(false);
    setTypingDone(false);
  }, [currentVisitorId]);

  // Auto-advance door dialogues every 3 seconds after typing finishes
  useEffect(() => {
    if (showAdmitReaction || showTurnAwayReaction || showChoices || !character) return;
    if (!typingDone) return;

    const isLast = doorDialogueIndex >= character.doorDialogue.length - 1;
    if (isLast) {
      setShowChoices(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setTypingDone(false);
      setDoorDialogueIndex((prev) => prev + 1);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [typingDone, doorDialogueIndex, showAdmitReaction, showTurnAwayReaction, showChoices, character]);

  if (!character) {
    return (
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <PhaseIndicator day={day} phase="night" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="font-mono text-foreground text-fluid-heading mb-8">
            No more visitors tonight.
          </p>
          <Button onClick={finishNight} ariaLabel="Continue to morning">
            Continue
          </Button>
        </motion.div>
      </div>
    );
  }

  const allDoorDialogues = character.doorDialogue;
  const currentDialogue = showAdmitReaction
    ? { text: character.admitReaction }
    : showTurnAwayReaction
      ? { text: character.turnAwayReaction }
      : allDoorDialogues[doorDialogueIndex];

  const isLastDoorDialogue = doorDialogueIndex >= allDoorDialogues.length - 1;

  const onAdmit = () => {
    setShowAdmitReaction(true);
    setShowChoices(false);
  };

  const onTurnAway = () => {
    setShowTurnAwayReaction(true);
    setShowChoices(false);
  };

  const executeAdmit = () => {
    admitCurrent();
    nextVisitor();
  };

  const executeTurnAway = () => {
    turnAwayCurrent();
    nextVisitor();
  };

  const onAdmitReactionComplete = () => {
    let remaining = 3;
    setCountdown(remaining);
    const timer = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        executeAdmit();
      }
    }, 1000);
  };

  const onTurnAwayReactionComplete = () => {
    let remaining = 3;
    setCountdown(remaining);
    const timer = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        executeTurnAway();
      }
    }, 1000);
  };

  const nightComplete =
    nightQueue.length > 0 && nightQueue.every((v) => v.outcome !== "pending");

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12">
      <PhaseIndicator day={day} phase="night" />

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        {/* Character portrait — left side */}
        <div className="relative w-[50vw] max-w-[500px] lg:max-w-[600px] h-[50vh] md:h-[85vh] flex items-end justify-center">
          <CharacterPortrait
            name={character.name}
            alt={character.name}
            className="w-full h-full object-contain object-bottom"
          />
        </div>

        {/* Dialogue + buttons — right side */}
        <div className="flex flex-col gap-4 md:gap-[26px] w-full max-w-[649px]">
          <DialogueBox
            text={currentDialogue?.text ?? "..."}
            speakerName={character.name}
            showGhostLetMeIn={!showAdmitReaction && !showTurnAwayReaction && isLastDoorDialogue && showChoices}
            onComplete={() => {
              if (showAdmitReaction) {
                onAdmitReactionComplete();
              } else if (showTurnAwayReaction) {
                onTurnAwayReactionComplete();
              } else {
                setTypingDone(true);
              }
            }}
          />

          {!showAdmitReaction && !showTurnAwayReaction && showChoices && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
              className="flex gap-3 md:gap-[25px]"
            >
              <Button
                variant="primary"
                onClick={onAdmit}
                fullWidth
                ariaLabel="Let them in"
              >
                Let them in
              </Button>
              <Button
                variant="secondary"
                onClick={onTurnAway}
                fullWidth
                ariaLabel="Go away"
              >
                Go Away
              </Button>
            </motion.div>
          )}

          {/* Countdown during reaction */}
          <AnimatePresence>
            {(showAdmitReaction || showTurnAwayReaction) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <p className="font-mono text-foreground/40 text-fluid-small tracking-widest">
                  {countdown > 0 ? countdown : "..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {nightComplete && !showAdmitReaction && !showTurnAwayReaction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-4"
            >
              <Button onClick={finishNight} ariaLabel="Proceed to morning">
                Proceed to morning
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
