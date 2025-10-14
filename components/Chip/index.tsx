// Utils
import { classes } from "@/utils";

export const Chip = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <span
      className={classes(
        "inline-block bg-background text-white px-2 py-1 rounded-full",
        className
      )}
    >
      {children}
    </span>
  );
};
