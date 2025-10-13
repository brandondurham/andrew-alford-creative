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
    id: "about",
    label: "About",
    href: "/about",
  },
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
          : "text-foreground mix-blend-darken",
        "flex flex-col gap-[1vw]",
        className
      )}
    >
      <h1>
        <NextLink
          className={classes(
            "flex text-center",
            "text-[9.194vw] leading-[0.8]",
            "justify-center pl-[0.02em]",
            "[&>span]:translate-y-[0.041em]",
            pathname === "/" || isDragging
              ? "pointer-events-none"
              : "pointer-events-auto"
          )}
          href="/"
        >
          <span className="font-champion-bantamweight">Andrew</span>
          <span className="font-champion-welterweight">Alford</span>
          <span className="font-champion-heviweight">Creative</span>
        </NextLink>
      </h1>
      <Links
        className="pointer-events-auto font-[400] !justify-center text-center font-[RingsideExtraWide-Semi]"
        separator=","
        links={PAGES}
      />
      {/* <div className="pointer-events-auto text-[15px] text-right grow">
        A{" "}
        <Link
          decorated
          href="https://www.thisassembly.com/"
          target="_blank"
        >
          This Assembly
        </Link>{" "}
        company.
        &copy;{new Date().getFullYear()} All rights reserved.
      </div> */}
    </header>
  );
}
