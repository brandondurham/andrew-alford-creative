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

export interface Themes {
  background: string;
  classes?: string | null;
  // colors: string[];
  foreground: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
