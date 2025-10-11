"use client";

import { useTheme, ThemeNames, type Theme } from "@/context/ThemeContext";

/**
 * Example component showing how to use the theme context
 * 
 * You can use this component anywhere in your app to switch themes
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = Object.values(ThemeNames) as Theme[];

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`pointer-events-auto px-4 py-2 rounded capitalize ${
            theme === t ? "font-bold underline" : ""
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

