"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  x1: number;
  x2: number;
}

// Deterministic pseudo-random generator seeded by particle index
// to avoid hydration mismatches between server and client
function hashFloat(seed: number, min = 0, max = 1): number {
  let s = seed;
  s = ((s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  return min + s * (max - min);
}

function buildParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: hashFloat(i * 7 + 1, 0, 100),
    y: hashFloat(i * 13 + 3, 0, 100),
    size: hashFloat(i * 17 + 5, 1, 3),
    duration: hashFloat(i * 23 + 11, 15, 35),
    delay: hashFloat(i * 29 + 19, 0, 10),
    opacity: hashFloat(i * 31 + 37, 0.1, 0.4),
    x1: hashFloat(i * 41 + 43, -10, 10),
    x2: hashFloat(i * 47 + 53, -15, 15),
  }));
}

export function DustParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(buildParticles(count));
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[6] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: [0, -30, -60],
            x: [0, p.x1, p.x2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
