"use client";

import { useMemo } from "react";

// Utils
import { classes } from "@/utils";

// Consts
const COLORS = [
  "bg-[#f94f37] text-[#feb531]",
  "bg-[#1451c1] text-[#0dcbdb]",
  "bg-[#8b0f5d] text-[#fb563b]",
  "bg-[#fab328] text-[#eee8df]",
];

function LoadingLine() {
  return (
    <div
      className={classes(
        "uppercase",
        "font-[Knockout-94UltmtSumo] -indent-[0.046em] leading-[0.665] text-[16.862vw]"
      )}
    >
      <span
        className={classes(
          "block -translate-y-[0.026em]"
        )}
      >
        Loading
      </span>
    </div>
  );
}

export function Loading() {
  const colors = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
  }, []);

  return (
    <div
      className={classes(
        "fixed inset-0 p-[1vw] z-40 text-outline-[currentColor]",
        colors
      )}
    >
      <div className="animate-scroll-up flex flex-col gap-[2vw] mix-blend-screen">
        {Array.from({ length: 300 }).map((_, i) => (
          <LoadingLine key={i} />
        ))}
      </div>
    </div>
  );
}
