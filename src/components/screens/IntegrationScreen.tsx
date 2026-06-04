"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getCharacterById } from "@/data/characters";
import { Button } from "@/components/ui/Button";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";
import { DialogueBox } from "@/components/ui/DialogueBox";
import { verifyKillerGuess } from "@/lib/gameLogic";

export function IntegrationScreen() {
  const day = useGameStore((s) => s.day);
  const selectedCharacterId = useGameStore((s) => s.selectedCharacterId);
  const setScreen = useGameStore((s) => s.setScreen);
  const kickFromCabin = useGameStore((s) => s.kickFromCabin);
  const markLinkRevealed = useGameStore((s) => s.markLinkRevealed);
  const revealKiller = useGameStore((s) => s.revealKiller);

  const character = useMemo(
    () =>
      selectedCharacterId ? getCharacterById(selectedCharacterId) : undefined,
    [selectedCharacterId],
  );

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showActions, setShowActions] = useState(true);
  const [showKickReaction, setShowKickReaction] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setDialogueIndex(0);
    setShowActions(true);
    setShowKickReaction(false);
    setCountdown(3);
  }, [selectedCharacterId]);

  if (!character) {
    return (
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <PhaseIndicator day={day} phase="day" />
        <Button onClick={() => setScreen("people-list")} ariaLabel="Back">
          Back
        </Button>
      </div>
    );
  }

  const dialogue =
    character.integrationDialogue[dialogueIndex] ??
    character.integrationDialogue[0];

  const onTellStory = () => {
    markLinkRevealed(
      character.id,
      character.chainLinks.map((l) => `${l.fromId}->${l.toId}`),
    );
    if (dialogueIndex < character.integrationDialogue.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setShowActions(true);
    }
  };

  const onKick = () => {
    setShowKickReaction(true);
    setShowActions(false);
  };

  const executeKick = () => {
    if (verifyKillerGuess(character.id)) {
      revealKiller();
    }
    kickFromCabin(character.id);
  };

  const onKickReactionComplete = () => {
    setCountdown(3);
    let remaining = 3;
    const timer = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        window.clearInterval(timer);
        executeKick();
      }
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-12">
      <PhaseIndicator day={day} phase="day" />

      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        {/* Character portrait — left side (same as NightPhase) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={showKickReaction ? `${character.id}-kick` : character.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative w-[50vw] max-w-[500px] lg:max-w-[600px] h-[50vh] md:h-[85vh] flex items-end justify-center"
          >
            <img
              src={`/assets/images/character/${character.name}.png`}
              alt={character.name}
              className="w-full h-full object-contain object-bottom"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dialogue + buttons — right side (same as NightPhase) */}
        <div className="flex flex-col gap-4 md:gap-[26px] w-full max-w-[649px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={showKickReaction ? `${character.id}-kick` : `${character.id}-int-${dialogueIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <DialogueBox
                text={showKickReaction ? character.kickReaction : dialogue.text}
                speakerName={character.name}
                onComplete={() => {
                  if (showKickReaction) {
                    onKickReactionComplete();
                  } else {
                    setShowActions(true);
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {showActions && !showKickReaction && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex gap-3 md:gap-[25px]"
            >
              <Button
                variant="primary"
                onClick={onTellStory}
                fullWidth
                ariaLabel="Tell story"
              >
                Tell Story
              </Button>
              <Button
                variant="secondary"
                onClick={onKick}
                fullWidth
                ariaLabel="Kick them"
              >
                Kick Them
              </Button>
            </motion.div>
          )}

          {/* Countdown during kick reaction */}
          <AnimatePresence>
            {showKickReaction && (
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

          {!showKickReaction && (
            <div className="flex justify-end mt-2">
              <Button
                variant="ghost"
                onClick={() => setScreen("people-list")}
                ariaLabel="Back to people list"
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
