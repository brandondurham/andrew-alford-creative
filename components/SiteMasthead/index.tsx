"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

// Components
import { Links } from "@/components/Links";

// Context
import { useDragging } from "@/context/DraggingContext";

// Utils
import { classes } from "@/utils";

// Context
import { useTheme } from "@/context/ThemeContext";
import { ThemeNames } from "@/context/ThemeContext/types";

// Consts
import type { Link as LinkType } from "@/components/Links/types";

const PAGES: LinkType[] = [
  {
    id: "select-projects",
    label: "Select Projects",
    href: "/select-projects",
  },
  {
    id: "thoughts",
    label: "Thoughts",
    href: "/thoughts",
  },
  {
    id: "info",
    label: "Info",
    href: "/info",
  },
  {
    id: "client-portal",
    label: "Client Portal",
    href: "/clients",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
  },
];

export function SiteMasthead({ className }: { className?: string }) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const { isDragging } = useDragging();

  return (
    <header
      className={classes(
        "py-[2vw] lg:py-[1vw] text-[0.75em] uppercase",
        theme === ThemeNames.YELLOW
          ? "text-background mix-blend-plus-lighter"
          : "text-foreground mix-blend-luminosity",
        "flex flex-col gap-[2vw] lg:gap-[1vw]",
        isDragging ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
    >
      <h1
        className={
          pathname === "/" ? "pointer-events-none" : "pointer-events-auto"
        }
      >
        <NextLink
          className={classes(
            "flex flex-col gap-[2vw] lg:gap-0 text-center lg:flex-row justify-center items-center pl-[0.02em]"
          )}
          href="/"
        >
          <div className="flex leading-[0.8] lg:leading-[0.8] text-[21.5vw] lg:text-[9.21vw] [&>span]:translate-y-[0.041em]">
            <span className="font-champion-bantamweight">Andrew</span>
            <span className="font-champion-welterweight">Alford</span>
          </div>
          <div className="flex leading-[0.8] lg:leading-[0.8] text-[15.8vw] lg:text-[9.21vw] [&>span]:translate-y-[0.041em] -indent-[0.05em] lg:-indent-[0.01em]">
            <span className="font-champion-heviweight">Creative</span>
          </div>
        </NextLink>
      </h1>
      <Links
        className={classes(
          "whitespace-nowrap flex-nowrap text-center [&_a]:hover:text-white/80",
          "font-knockout-full font-black",
          "[&_a]:underline [&_a]:underline-offset-[0.5vw] [&_a]:text-decoration-thickness-0.05em",
          "[&_a]:hover:underline",
          "flex flex-wrap lg:flex-nowrap justify-between lg:justify-center px-[2vw] lg:px-[1vw] gap-y-[2.5vw] lg:gap-y-0",
          "text-[4.4vw] lg:text-[2.14vw] leading-[0.7]"
        )}
        decorated={false}
        separator={<span className="px-[0.75vw] hidden lg:block">•</span>}
        spacing="gap-0"
        links={PAGES}
      />
    </header>
  );
}

SiteMasthead.displayName = "SiteMasthead";
