import { type Theme, type Themes, ThemeNames } from "./types";

/**
 * Theme color mappings
 * Add corresponding colors for new themes here
 */
export const ThemeColors: Record<Theme, Themes> = {
  [ThemeNames.BLUE]: {
    background: "#1418ea",
    classes: "mix-blend-multiply",
    // colors: ["#ff00ff", "ffff00", "00ffff"],
    foreground: "#e51545",
  },
  [ThemeNames.YELLOW]: {
    background: "#f6de00",
    classes: "mix-blend-exclusion",
    // colors: ["#ff00ff", "ffff00", "00ffff"],
    foreground: "#e76611",
  },
  [ThemeNames.RED]: {
    background: "#ff000e",
    // colors: ["#ff00ff", "ffff00", "00ffff"],
    foreground: "#0a1741",
  },
};
