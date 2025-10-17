"use client";

// Utils
import { classes } from "@/utils";

// Context
import { useTheme } from "@/context/ThemeContext";

// Types
import { ThemeNames } from "@/context/ThemeContext/types";

export default function SiteCredits() {
  const { theme } = useTheme();
  return (
    <address
      className={classes(
        "flex flex-col text-pretty",
        "not-italic",
        theme === ThemeNames.YELLOW ? "text-foreground" : "text-background"
      )}
    >
      <div className="inline-flex flex-wrap">
        <div className="font-champion-liteweight font-normal text-[31vw] lg:text-[15.7vw] leading-[0.9] uppercase text-outline-[currentColor]">
          <span>SiteCre</span>
          <span className="flex flex-col lg:flex-row lg:items-center gap-[2.3vw] lg:gap-[1.3vw]">
            <span className="whitespace-nowrap flex flex-col">
              <span>dits</span>
            </span>
            <div
              className={classes(
                "text-black flex flex-col gap-[2.6vw] lg:gap-[1vw] normal-case grow font-ringside-regular text-[5.6vw] lg:text-[1.7vw] leading-[1.2] font-semibold text-outline-none pb-[1.5vw] text-left",
                theme === ThemeNames.YELLOW
                  ? "[&_a]:text-foreground"
                  : "[&_a]:text-background"
              )}
            >
              <span>
                <span className="flex flex-col">Name:</span>
                <a
                  className="link-underline"
                  href="mailto:brandon@smallparade.com"
                >
                  Brandon Durham @ Small Parade
                </a>
              </span>
              <span>
                <span className="flex flex-col">Flair:</span>
                Site Design & Development
              </span>
            </div>
          </span>
        </div>
      </div>
    </address>
  );
}
