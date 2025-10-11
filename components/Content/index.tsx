// Utils
import { classes } from "@/utils";

export function Content({ children, className, style = {} }) {
  return (
    <main className={classes('grow', className)} style={style}>
      {children}
    </main>
  );
}
