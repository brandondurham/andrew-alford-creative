"use client";

// Context
import { useTheme } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

export function Content({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { theme } = useTheme();

  if (!theme) return (
    <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300">
      Loading…
    </div>
  );

  return (
    <div
      className={classes(
        "min-h-screen flex flex-col pointer-events-none transition-opacity duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
