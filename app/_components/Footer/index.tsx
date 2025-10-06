"use client";

// Components
import { Links } from "../Links";

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
        "flex items-end gap-4 justify-between p-6 w-full sticky bottom-6 pointer-events-auto mix-blend-overlay",
        className
      )}
    >
      <Links links={PAGES} />
      <div className="flex flex-col gap-[0.2em] text-right">
        <div className="text-[0.7em]">
          A <a href="https://www.thisassembly.com/">This Assembly</a> Company.
        </div>
        <div className="text-[0.5em]">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
