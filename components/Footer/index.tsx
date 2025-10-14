"use client";

// Components
import { Link } from "@/components/Link";

// Context
import { useTheme } from "@/context/ThemeContext";
import { ThemeNames } from "@/context/ThemeContext/types";

// Assets
import Logo from "@/assets/svg/logo.svg";

// Utils
import { classes } from "@/utils";

export function Footer({ className }) {
  const { theme } = useTheme();

  return (
    <footer
      className={classes(
        "flex justify-between pointer-events-none text-[15px] items-end",
        theme === ThemeNames.YELLOW
          ? "text-background mix-blend-plus-lighter"
          : "text-foreground mix-blend-luminosity",
        className
      )}
    >
      <Link className="pointer-events-auto" href="/">
        <Logo className="w-[80px]" />
      </Link>
      <div>
        A{" "}
        <Link
          decorated
          className="pointer-events-auto"
          href="https://www.thisassembly.com/"
          target="_blank"
        >
          This Assembly
        </Link>{" "}
        company. &copy;{new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
