"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Utils
import { shuffle } from "@/utils";

import { ThemeNames, type Theme } from "./types";
import { ThemeColors } from "./consts";

/**
 * Theme Context for managing app-wide theme state
 * 
 * ## Adding a New Theme:
 * 
 * 1. Add the theme to the ThemeNames enum:
 *    export enum ThemeNames {
 *      BLUE = "blue",
 *      YELLOW = "yellow",
 *      RED = "red",
 *      GREEN = "green",  // Add new theme here
 *    }
 * 
 * 2. Add the corresponding color to ThemeColors:
 *    export const ThemeColors: Record<Theme, string> = {
 *      ...
 *      [ThemeNames.GREEN]: "#00ff00",
 *    };
 * 
 * That's it! The theme will now be available throughout the app.
 */

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = undefined }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const searchParams = useSearchParams();
  const explicitTheme = searchParams.get("theme");

  useEffect(() => {
    if (defaultTheme) {
      setTheme(defaultTheme);
    } else if (explicitTheme) {
      setTheme(explicitTheme as Theme);
    } else {
      const themeOptions = Object.values(ThemeNames);
      const randomTheme = shuffle(themeOptions)[0] as Theme;
      setTheme(randomTheme);
    }
  }, [defaultTheme, explicitTheme]);

  // Update CSS variables whenever theme changes
  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty(
        "--background",
        ThemeColors[theme].background
      );
      document.documentElement.style.setProperty(
        "--foreground",
        ThemeColors[theme].foreground
      );
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * Usage:
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * 
 * // Get current theme
 * console.log(theme); // "blue" | "yellow" | "red"
 * 
 * // Change theme
 * setTheme("blue");
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
