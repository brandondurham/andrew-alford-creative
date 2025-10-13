import { ThemeNames } from "@/context/ThemeContext/types";

export const colors = {
  [ThemeNames.BLUE]: {
    background: "#1418ea",
    foreground: "#ffffff",
    // blendMode: "mix-blend-difference",
  },
  [ThemeNames.YELLOW]: {
    background: "#fbcb39",
    foreground: "#ffffff",
    blendMode: "mix-blend-difference",
  },
  [ThemeNames.RED]: {
    background: "#ff000e",
    foreground: "#ffffff",
    blendMode: "mix-blend-difference",
  },
}

export default colors;
