"use client";

import { useEffect, useState } from "react";

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
  const [showGuides, setShowGuides] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowGuides((state) => !state);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  if (!theme)
    return (
      <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300">
        Loading…
      </div>
    );

  return (
    <div
      className={classes(
        "min-h-screen flex flex-col transition-opacity duration-300",
        className
      )}
    >
      {children}
      {showGuides && (
        <div className="fixed inset-[1vw] z-50 [box-shadow:0_0_0_1px_cyan] pointer-events-none" />
      )}
    </div>
  );
}
