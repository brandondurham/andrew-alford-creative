"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Utils
import { shuffle } from "@/utils";

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

/**
 * Theme names enum
 */
export enum ThemeNames {
  BLUE = "blue",
  YELLOW = "yellow",
  RED = "red",
}

/**
 * Theme type derived from ThemeNames
 */
export type Theme = `${ThemeNames}`;

/**
 * Theme color mappings
 * Add corresponding colors for new themes here
 */
export const ThemeColors: Record<
  Theme,
  { background: string; foreground: string; blendMode: string | null }
> = {
  [ThemeNames.BLUE]: {
    background: "#1418ea",
    foreground: "#ffffff",
    blendMode: "mix-blend-difference",
  },
  [ThemeNames.YELLOW]: {
    background: "#fbe733",
    foreground: "#ffffff",
    blendMode: "mix-blend-difference",
  },
  [ThemeNames.RED]: {
    background: "#ff000e",
    foreground: "#ffffff",
    blendMode: "mix-blend-difference",
  },
};

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

  useEffect(() => {
    if (defaultTheme) {
      setTheme(defaultTheme);
    } else {
      const themeOptions = Object.values(ThemeNames);
      const randomTheme = shuffle(themeOptions)[0] as Theme;
      setTheme(randomTheme);
    }
  }, [defaultTheme]);

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
