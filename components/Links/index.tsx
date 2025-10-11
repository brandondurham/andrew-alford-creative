"use client";

import { usePathname } from "next/navigation";

// Components
import { Link } from "../Link";

// Context
import { useDragging } from "@/context/DraggingContext";

// Utils
import { classes } from "@/utils";

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
  links: { href: string; name: string }[];
  separator?: string;
  spacing?: string;
}) {
  const pathname = usePathname();
  const { isDragging } = useDragging();
  return (
    <ul className={classes("flex flex-wrap", spacing, className)}>
      {links.map(({ href, name }, index) => {
        const isSelected = pathname === href;
        return (
          <li className="flex items-baseline gap-1" key={name}>
            <span>
              <Link
                className={classes(
                  fonts?.[index],
                  isDragging ? "pointer-events-none" : "pointer-events-auto",
                  isSelected && "text-outline-none"
                )}
                decorated={decorated}
                href={href}
              >
                {name}
              </Link>
              {separator && index < links.length - 1 && ", "}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
