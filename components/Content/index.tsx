// Utils
import { classes } from "@/utils";
import { useDragging } from "@/context/DraggingContext";

export function Content({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { isDragging } = useDragging();

  return (
    <section
      className={classes(
        "flex flex-col bg-gray-100",
        "shadow-xl/30 rounded-lg fixed bottom-[1vw] top-[1vw] left-[50vw] right-[1vw] z-100 overflow-auto",
        "animate-fade-in",
        isDragging ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
    >
      {children}
    </section>
  );
}
