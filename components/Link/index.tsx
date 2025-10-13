import NextLink from "next/link";

// Utils
import { classes } from "@/utils";

export function Link({
  children,
  className,
  decorated = true,
  href,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  decorated?: boolean;
  href: string;
  [key: string]: any;
}) {
  return (
    <NextLink
      className={classes(
        decorated ? "link-underline" : "no-underline hover:no-underline",
        className
      )}
      href={href}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
