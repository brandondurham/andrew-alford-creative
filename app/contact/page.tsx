"use client";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";

// Utils
import { classes } from "@/utils";

// Context
import { Content } from "@/components/Content";
import { useTheme } from "@/context/ThemeContext";

// Types
import { ThemeNames } from "@/context/ThemeContext/types";

export default function Contact({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <Content className={className}>
      <ContentMasthead>Contact</ContentMasthead>
      <address
        className={
          classes(
            "items-center justify-center flex flex-col gap-1 grow p-[1vw] text-[1rem] font-light font-monaspace-neon leading-[1.6] text-center uppercase not-italic",
            theme === ThemeNames.YELLOW ? "text-foreground" : "text-background",
          )
        }
      >
        <span>Andrew Alford Creative</span>
        {/* <a className="link-underline" href="tel:+13123440344">
          +1(312)344-0344
        </a> */}
        <a
          className="link-underline"
          href="mailto:info@andrewalfordcreative.com"
        >
          info@andrewalfordcreative.com
        </a>
        <a
          className="link-underline"
          href="https://instagram.com/andrewalfordcreative"
        >
          @andrewalfordcreative
        </a>
      </address>
    </Content>
  );
}
