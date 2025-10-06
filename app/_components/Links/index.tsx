"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Styles
import { classes } from "@/utils";

export function Links({ className, links }: { className?: string, links: { href: string, name: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className={classes(className)}>
      <ul className="flex flex-wrap gap-2">
        {links.map(({ href, name }, index) => (
          <li className="inline-flex items-baseline gap-1" key={name}>
            {pathname === href && (
              <span className="font-[var(--font-decimal)] text-[0.8em]">▶</span>
            )}
            <span>
              <Link href={href}>
                {name}
              </Link>
              {index < links.length - 1 && ", "}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
