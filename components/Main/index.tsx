"use client";

// Utils
import { classes } from "@/utils";

export function Main({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={classes("pointer-events-none", className)}>
      {children}
    </main>
  );
}

Main.displayName = "Main";