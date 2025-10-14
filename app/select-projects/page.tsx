"use client";

// Consts
import { ThemeNames } from "@/context/ThemeContext/types";

// Context
import { useTheme } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

export default function SelectProjects({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <article
      className={classes(
        "relative pointer-events-none subpixel-antialiased",
        theme === ThemeNames.YELLOW ? "text-black" : "inherit",
        theme === ThemeNames.YELLOW && "subpixel-antialiased",
        "font-ringside-regular",
        "font-medium [font-size:clamp(1rem,1.7vw,26px)]",
        "leading-[1.35] text-pretty",
        className
      )}
    >
      <header className="pointer-events-auto font-bold pb-[4vh] pt-[4vh] ml-[50vw] pr-[1vw] text-balance flex flex-col gap-2 justify-end">
        <h1 className="text-balance">
          Select Projects
        </h1>
      </header>
    </article>
  );
}
