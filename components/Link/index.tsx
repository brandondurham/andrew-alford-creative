import NextLink from "next/link";

// Utils
import { classes } from "@/utils";

export function Link({
  children,
  className,
  decorated = true,
  href,
}: {
  children: string;
  className?: string;
  decorated?: boolean;
  href: string;
}) {
  return (
    <NextLink
      className={classes(
        decorated ? "link-underline" : "no-underline hover:no-underline",
        className
      )}
      href={href}
    >
      {children}
    </NextLink>
  );
}
