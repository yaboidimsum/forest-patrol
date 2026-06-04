import type { NightVisitor } from "@/types/game";

const coreSchedule: Record<number, string[]> = {
  1: ["mike"],
  2: ["roy"],
  3: ["ara", "zen"],
  4: ["isabel"],
  5: [],
};

const supportingPool = ["wanderer", "hiker", "scout"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface FullSchedule {
  queues: NightVisitor[][]; // index 0 = day 1, index 4 = day 5
  usedSupporting: string[];
}

export function generateFullSchedule(): FullSchedule {
  const usedSupporting: string[] = [];
  const queues: NightVisitor[][] = [];

  for (let day = 1; day <= 5; day++) {
    const core = coreSchedule[day] ?? [];

    if (core.length === 0) {
      queues.push([]);
      continue;
    }

    // Only pick from supporting characters not yet used this game
    const available = supportingPool.filter((id) => !usedSupporting.includes(id));
    const shuffled = shuffle(available);
    const count = Math.floor(Math.random() * Math.min(3, available.length + 1)); // 0 to available.length
    const extras = shuffled.slice(0, count);

    usedSupporting.push(...extras);

    const combined = shuffle([...core, ...extras]);
    queues.push(
      combined.map((characterId) => ({
        characterId,
        outcome: "pending" as const,
      })),
    );
  }

  return { queues, usedSupporting };
}

export const getNightQueue = (schedule: FullSchedule, day: number): NightVisitor[] => {
  return schedule.queues[day - 1] ?? [];
};

export const getTotalVisitors = (schedule: FullSchedule, day: number): number => {
  return (schedule.queues[day - 1] ?? []).length;
};
