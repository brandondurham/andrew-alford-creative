"use client";

import { useTheme } from "@/context/ThemeContext";
import { ThemeNames, type Theme } from "@/context/ThemeContext/types";
import { ThemeColors } from "@/context/ThemeContext/consts";

// Utils
import { classes } from "@/utils";

/**
 * Example component showing how to use the theme context
 * 
 * You can use this component anywhere in your app to switch themes
 */
export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const themes = Object.values(ThemeNames) as Theme[];

  return (
    <div className="fixed top-[50vh] left-4 flex flex-col gap-2 z-20 translate-y-[-50%]">
      {themes.map((t) => (
        <button
          className={classes(
            "font-decimal pointer-events-auto cursor-pointer rounded-full capitalize h-4 w-4 p-0",
            t === theme
              ? "bg-transparent shadow-[inset_0_0_6px_1px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.1)]"
              : ""
          )}
          key={t}
          onClick={() => setTheme(t)}
          style={{ backgroundColor: ThemeColors[t].background }}
        />
      ))}
    </div>
  );
}

