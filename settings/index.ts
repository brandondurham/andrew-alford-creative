import { ComponentNames } from "./types";

export const StackingContext: Record<ComponentNames, string> = {
  [ComponentNames.ThemeBackground]: "-z-1",
  [ComponentNames.Letters]: 'z-1',
  [ComponentNames.SiteMasthead]: 'z-2',
  [ComponentNames.Main]: 'z-3',
  [ComponentNames.Footer]: 'z-4',
};
