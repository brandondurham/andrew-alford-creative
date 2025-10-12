"use client";

import NextLink from "next/link";
// import { usePathname } from "next/navigation";

// Components
import { Links } from "@/components/Links";
// import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Context
import { useDragging } from "@/context/DraggingContext";
import { useTheme, ThemeColors } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

// Consts
const PAGES = [
  {
    name: "Select Projects",
    href: "/select-projects",
  },
  {
    name: "Articles",
    href: "/articles",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export function SiteMasthead({ className }: { className?: string }) {
  // const pathname = usePathname();
  const { isDragging } = useDragging();
  const { theme } = useTheme();
  const { blendMode = null } = ThemeColors[theme];

  return (
    <header
      className={classes(
        "uppercase relative z-[10] text-outline-[currentColor] text-foreground",
        "pointer-events-none",
        blendMode,
        className
      )}
    >
      <h1 className="pb-[1vw] flex flex-col">
        <NextLink
          className={classes(
            "block py-[1vw] translate-y-[0.042em] text-[9.21vw] leading-[0.8] text-center indent-2 hover:text-outline-none hover:text-white",
            // "bg-[url('https://d1hhug17qm51in.cloudfront.net/www-media/2018/08/24235310/AD16.169_01_H02-Large-TIFF_4000-pixels-long-scaled.jpg')] bg-[left_center] bg-size-[200%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background-clip:text]",
            // "animate-bg-scroll",
            isDragging ? "pointer-events-none" : "pointer-events-auto"
          )}
          href="/"
        >
          <span className="font-champion-bantamweight">Andrew</span>
          <span className="font-champion-welterweight">Alford</span>
          <span className="font-champion-heviweight">Creative</span>
        </NextLink>
        <Links
          className={classes(
            "flex translate-y-[0.042em] text-[7.06vw] leading-[0.8] justify-center [&_a]:hover:text-outline-none [&_a]:hover:text-white"
          )}
          decorated={false}
          fonts={[
            "font-champion-liteweight",
            "font-champion-heviweight",
            "font-champion-bantamweight",
          ]}
          links={PAGES.map((page) => ({
            ...page,
            name: page.name.replace(" ", ""),
          }))}
          spacing="gap-[0.5vw]"
        />
      </h1>
      {/* <ThemeSwitcher /> */}
    </header>
  );
}
