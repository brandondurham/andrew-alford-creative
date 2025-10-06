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
    href: "/client",
  },
];

export function Footer({ className }) {
  return (
    <footer
      className={classes('flex items-baseline gap-4 justify-between p-6 w-full sticky bottom-6 pointer-events-auto', className)}
    >
      <Links links={PAGES} />
      <div className="text-[0.7em]">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}
