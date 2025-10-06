// Utils
import { classes } from "@/utils";

export function Content({ children, className }) {
  return (
    <main className={classes('basis-1/2', className)}>
      {children}
    </main>
  );
}
