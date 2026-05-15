"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

interface LogoProps {
  variant?: "dark" | "white" | "taupe";
  className?: string;
}

const colors = {
  dark:  "#4D5257",
  white: "#FFFFFF",
  taupe: "#8B816E",
};

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const locale = useLocale();
  const fill = colors[variant];

  return (
    <Link href={`/${locale}`} aria-label="GIINA — Home" className={`inline-block ${className}`}>
      <svg
        width="80"
        height="20"
        viewBox="0 0 80 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Lettermark text — replace with actual GIINA SVG logo file when available */}
        <text
          x="0"
          y="16"
          fontFamily="var(--font-open-sauce-one), serif"
          fontSize="18"
          fontWeight="300"
          letterSpacing="6"
          fill={fill}
        >
          GIINA
        </text>
      </svg>
    </Link>
  );
}