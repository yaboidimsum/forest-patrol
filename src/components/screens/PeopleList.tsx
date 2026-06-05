"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getCharacterById } from "@/data/characters";
import { Button } from "@/components/ui/Button";
import { PhaseIndicator } from "@/components/ui/PhaseIndicator";
import { CharacterPortrait } from "@/components/ui/CharacterPortrait";
import { cn } from "@/lib/cn";
import { useState } from "react";

export function PeopleList() {
  const day = useGameStore((s) => s.day);
  const cabin = useGameStore((s) => s.cabin);
  const advanceToIntegration = useGameStore((s) => s.advanceToIntegration);
  const finishDay = useGameStore((s) => s.finishDay);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const inside = cabin.filter((c) => c.status === "inside");
  const selected = selectedId ? getCharacterById(selectedId) : null;
  const selectedOccupant = selectedId
    ? cabin.find((c) => c.characterId === selectedId)
    : null;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-2 md:px-4 lg:px-8 py-4">
      <PhaseIndicator day={day} phase="day" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[1100px] h-[85vh] md:h-[80vh] bg-panel/90 backdrop-blur-sm border-2 border-deep overflow-hidden flex flex-col md:flex-row panel-depth"
      >
        {/* Character list — scrollable */}
        <div className="flex md:flex-col gap-1 md:gap-0 overflow-x-auto md:overflow-y-auto md:w-[120px] lg:w-[200px] shrink-0 p-2 md:p-0 bg-deep/50 scrollbar-thin">
          {inside.map((occupant, i) => {
            const character = getCharacterById(occupant.characterId);
            if (!character) return null;
            const isSelected = occupant.characterId === selectedId;
            return (
              <motion.button
                key={occupant.characterId}
                type="button"
                onClick={() => setSelectedId(occupant.characterId)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06, ease: "easeOut" }}
                className={cn(
                  "relative shrink-0 size-[72px] md:size-[120px] lg:size-[200px] bg-deep flex items-center justify-center hover-lift cursor-pointer",
                  isSelected && "ring-2 ring-foreground",
                )}
                aria-label={character.name}
              >
                <CharacterPortrait
                  name={character.name}
                  alt={character.name}
                  className="size-[56px] md:size-[100px] lg:size-[180px] object-contain"
                />
              </motion.button>
            );
          })}

          {inside.length === 0 && (
            <div className="flex items-center justify-center size-[72px] md:size-[120px] lg:size-[200px] opacity-30">
              <p className="font-mono text-muted-fg text-fluid-small text-center px-1">
                Empty
              </p>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="flex-1 flex flex-col min-w-0 p-3 md:p-4 lg:p-6 overflow-y-auto">
          {/* Top actions */}
          <div className="flex items-center justify-between gap-2 mb-4 md:mb-6 shrink-0">
            <Button
              variant="primary"
              disabled={!selected}
              onClick={() => selected && advanceToIntegration(selected.id)}
              ariaLabel="Interrogate selected"
            >
              Interrogate
            </Button>
            <Button
              variant="ghost"
              onClick={finishDay}
              ariaLabel="Skip the day"
            >
              Skip the day
            </Button>
          </div>

          {/* Story content */}
          <div className="flex-1 flex flex-col gap-4 md:gap-[40px] overflow-y-auto">
            {selected ? (
              <>
                <div className="flex items-center gap-4">
                  <CharacterPortrait
                    name={selected.name}
                    alt={selected.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain shrink-0"
                  />
                  <div>
                    <h2 className="font-mono text-white text-fluid-heading tracking-tight">
                      {selected.name}
                    </h2>
                    <p className="font-mono text-foreground/50 text-fluid-small tracking-tight uppercase">
                      {selected.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:gap-4">
                  <h3 className="font-mono text-white text-fluid-heading tracking-tight">
                    First Arrival
                  </h3>
                  <p className="font-mono text-[#7ab0a4] text-fluid-body tracking-tight leading-snug">
                    {selected.firstArrival}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:gap-4">
                  <h3 className="font-mono text-white text-fluid-heading tracking-tight">
                    Further Information
                  </h3>
                  <p className="font-mono text-[#7ab0a4] text-fluid-body tracking-tight leading-snug">
                    {selectedOccupant?.furtherQuestionRevealed
                      ? selected.furtherQuestion
                      : "Empty"}
                  </p>
                </div>
              </>
            ) : (
              <p className="font-mono text-muted-fg text-fluid-body">
                Select a survivor to review their story.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
