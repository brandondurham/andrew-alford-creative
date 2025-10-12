"use client";

// Utils
import { classes } from "@/utils";

export function ThemeBackground({ className }: { className?: string }) {
  return (
    <div 
      className={classes("pointer-events-none", className)} 
      style={{ backgroundColor: "var(--background)" }} 
    />
  );
}

