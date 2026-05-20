"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Curtain — carbon panel that slides up on every navigation */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#4D5257",
          zIndex: 9000,
          transformOrigin: "top",
          pointerEvents: "none",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      />

      {children}
    </div>
  );
}
