"use client";

import { motion } from "framer-motion";

export function AtmosphericFog() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Layer 1 — slow drift */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 20% 80%, rgba(2,91,69,0.3) 0%, transparent 60%)",
        }}
        animate={{ x: ["-10%", "10%", "-10%"], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Layer 2 — opposite drift */}
      <motion.div
        className="absolute inset-0 opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 70%, rgba(1,28,22,0.4) 0%, transparent 60%)",
        }}
        animate={{ x: ["10%", "-10%", "10%"], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Layer 3 — center mist */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 90%, rgba(135,218,198,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
