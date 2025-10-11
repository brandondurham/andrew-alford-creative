"use client";

// Context
import { useTheme, ThemeColors } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

export function ThemeBackground({ className }: { className?: string }) {
  const { theme } = useTheme();
  const backgroundColor = ThemeColors[theme].background;

  return <div className={classes("opacity-80 transition-bg duration-300", className)} style={{ backgroundColor }} />;
}

