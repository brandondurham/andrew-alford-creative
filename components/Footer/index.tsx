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
        "flex justify-between pointer-events-none text-[13px] lg:text-[15px] items-end p-[4vw] lg:p-[3vw] top-auto text-foreground",
        theme === ThemeNames.YELLOW
          ? "text-background mix-blend-plus-lighter"
          : "text-foreground mix-blend-luminosity",
        className
      )}
    >
      <Link className="pointer-events-auto" href="/">
        <Logo className="w-[90px]" />
      </Link>
      <div className="text-right leading-[1.4] flex gap-1 lg:gap-2 flex-col">
        <span>
          <Link decorated className="pointer-events-auto" href="/site-credits">
            Site credits.
          </Link>{" "}
          A{" "}
          <Link
            decorated
            className="pointer-events-auto"
            href="https://www.thisassembly.com/"
            target="_blank"
          >
            This Assembly
          </Link>{" "}
          company.
        </span>
        <span>&copy;{new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";
