"use client";

import { createContext, useContext, useState, ReactNode, useEffect, Suspense } from "react";
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

/**
 * Inner component that uses useSearchParams
 * This is separated to be wrapped in Suspense
 */
function ThemeInitializer({ 
  defaultTheme, 
  onThemeInit 
}: { 
  defaultTheme?: Theme;
  onThemeInit: (theme: Theme) => void;
}) {
  const searchParams = useSearchParams();
  const explicitTheme = searchParams.get("theme");

  useEffect(() => {
    if (defaultTheme) {
      onThemeInit(defaultTheme);
    } else if (explicitTheme) {
      onThemeInit(explicitTheme as Theme);
    } else {
      const themeOptions = Object.values(ThemeNames);
      const randomTheme = shuffle(themeOptions)[0] as Theme;
      onThemeInit(randomTheme);
    }
  }, [defaultTheme, explicitTheme, onThemeInit]);

  return null;
}

export function ThemeProvider({ children, defaultTheme = undefined }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

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
      <Suspense fallback={null}>
        <ThemeInitializer defaultTheme={defaultTheme} onThemeInit={setTheme} />
      </Suspense>
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
