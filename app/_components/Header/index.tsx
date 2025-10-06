"use client";

// Components
import { Links } from "../Links";

// Utils
import { classes } from "@/utils";

// Consts
const PAGES = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Papers",
    href: "/articles",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={classes(
        "sticky top-0 basis-1/2 p-6 flex items-start mix-blend-overlay",
        className
      )}
    >
      <hgroup className="pointer-events-auto">
        <h1>Andrew Alford Creative</h1>
        <Links links={PAGES} />
      </hgroup>
    </header>
  );
}
