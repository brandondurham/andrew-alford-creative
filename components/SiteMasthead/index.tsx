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
        "p-[1vw] w-full text-[0.75em] uppercase",
        theme === ThemeNames.YELLOW
          ? "text-background mix-blend-plus-lighter"
          : "text-foreground mix-blend-luminosity",
        "flex flex-col gap-[1vw]",
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
            "flex text-center",
            "text-[9.194vw] leading-[0.8]",
            "justify-center pl-[0.02em]",
            "[&>span]:translate-y-[0.041em]"
          )}
          href="/"
        >
          <span className="font-champion-bantamweight">Andrew</span>
          <span className="font-champion-welterweight">Alford</span>
          <span className="font-champion-heviweight">Creative</span>
        </NextLink>
      </h1>
      <Links
        className={classes(
          "whitespace-nowrap flex-nowrap !justify-center text-center [&_a]:hover:text-white/80",
          "font-knockout-full text-[2.14vw] leading-[0.7] font-black",
          "[&_a]:underline [&_a]:underline-offset-[0.5vw] [&_a]:text-decoration-thickness-0.05em",
          "[&_a]:hover:underline"
        )}
        decorated={false}
        separator={<span className="px-[0.75vw]">•</span>}
        spacing="gap-0"
        links={PAGES}
      />
    </header>
  );
}

SiteMasthead.displayName = "SiteMasthead";
