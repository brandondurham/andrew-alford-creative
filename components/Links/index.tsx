"use client";

import { usePathname } from "next/navigation";

// Components
import { Link as NextLink } from "../Link";

// Context
import { useDragging } from "@/context/DraggingContext";

// Utils
import { classes } from "@/utils";

// Types
import type { Link } from "./types";

export function Links({
  className,
  decorated = true,
  fonts = undefined,
  links,
  separator = undefined,
  spacing = 'gap-2',
}: {
  className?: string;
  decorated?: boolean;
  fonts?: string[];
  links: Link[];
  separator?: React.ReactNode;
  spacing?: string;
}) {
  const pathname = usePathname();
  const { isDragging } = useDragging();
  return (
    <ul className={classes("flex items-baseline", spacing, className)}>
      {links.map(({ href, id, label }, index) => {
        const isSelected = pathname === href;
        return (
          <li className="flex items-baseline" key={id}>
            {href ? (
              <NextLink
                className={classes(
                  fonts?.[index],
                  isDragging ? "pointer-events-none" : "pointer-events-auto",
                  isSelected && "text-outline-none",
                  "mix-blend-normal"
                )}
                decorated={decorated}
                href={href}
              >
                {label as string}
              </NextLink>
            ) : (
              <div>{label}</div>
            )}
            {separator && index < links.length - 1 && separator}
          </li>
        );
      })}
    </ul>
  );
}
