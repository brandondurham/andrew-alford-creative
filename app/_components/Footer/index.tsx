"use client";

// Components
import { Links } from "../../../components/Links";

// Utils
import { classes } from "@/utils";

// Consts
const PAGES = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Client Portal",
    href: "/clients",
  },
];

export function Footer({ className }) {
  return (
    <footer
      className={classes(
        "text-light flex items-start gap-4 justify-between px-6 pt-6 w-full sticky bottom-6 pointer-events-auto mix-blend-overlay text-[0.7em]",
        className
      )}
    >
      <Links separator="," links={PAGES} />
      <div className="flex flex-col gap-[0.4em] text-right">
        <div>
          A <a href="https://www.thisassembly.com/">This Assembly</a> Company.
        </div>
        <div className="text-[14px]">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
