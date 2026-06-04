"use client";

import { useEffect, useState } from "react";

export function Vignette() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] vignette"
    />
  );
}
