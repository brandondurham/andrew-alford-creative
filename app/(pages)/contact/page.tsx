"use client";

// Utils
import { classes } from "@/utils";

// Context
import { useTheme } from "@/context/ThemeContext";

// Types
import { ThemeNames } from "@/context/ThemeContext/types";

export default function Contact({ className }: { className?: string }) {
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
        <div className="font-champion-middleweight font-normal text-[31vw] lg:text-[15.7vw] leading-[0.9] uppercase text-outline-[currentColor]">
          <span>Conta</span>
          <span className="flex flex-col lg:flex-row lg:items-end gap-[2.3vw] lg:gap-[1.3vw]">
            <span className="whitespace-nowrap">ct</span>
            <div className="text-black flex flex-col gap-[2.6vw] lg:gap-[1vw] normal-case grow font-ringside-regular text-[5.6vw] lg:text-[1.7vw] leading-[1.2] font-semibold text-outline-none [&_a]:text-background pb-[1.5vw]">
              <span>
                <span className="flex flex-col">Email:</span>
                <a
                  className="link-underline"
                  href="mailto:info@andrewalfordcreative.com"
                >
                  info@andrewalfordcreative.com
                </a>
              </span>
              <span>
                <span className="flex flex-col">Instagram:</span>
                <a
                  className="link-underline"
                  href="https://instagram.com/andrewalfordcreative"
                >
                  @andrewalfordcreative
                </a>
              </span>
            </div>
          </span>
        </div>
      </div>
    </address>
  );
}
