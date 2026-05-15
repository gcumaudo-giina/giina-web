"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Curtain — slides up on every navigation */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#4D5257",
          zIndex: 9000,
          transformOrigin: "bottom",
          pointerEvents: "none",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      />

      {children}
    </motion.div>
  );
}
