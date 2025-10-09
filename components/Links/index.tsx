"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Styles
import { classes as classNames } from "@/utils";

export function Links({
  classes = [],
  className,
  decorated = true,
  fonts = undefined,
  links,
  separator = undefined,
  spacing = 'gap-2',
}: {
  classes?: string[];
  className?: string;
  decorated?: boolean;
  fonts?: string[];
  links: { href: string; name: string }[];
  separator?: string;
  spacing?: string;
}) {
  const pathname = usePathname();

  return (
    <ul className={classNames("flex flex-wrap", spacing, className)}>
      {links.map(({ href, name }, index) => (
        <li className="flex items-baseline gap-1" key={name}>
          {/* {pathname === href && (
            <span className="font-[var(--font-decimal)] text-[0.8em]">▶</span>
          )} */}
          <span>
            <Link
              className={classNames(
                fonts?.[index],
                classes?.[index],
                decorated && "underline underline-offset-[0.25em] decoration-1"
              )}
              href={href}
            >
              {name}
            </Link>
            {separator && index < links.length - 1 && ", "}
          </span>
        </li>
      ))}
    </ul>
  );
}
