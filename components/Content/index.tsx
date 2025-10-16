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
        "shadow-lg/50 rounded-lg fixed bottom-[2vw] top-[2vw] left-[2vw] right-[2vw] lg:bottom-[1vw] lg:top-[1vw] lg:left-[50vw] lg:right-[1vw] z-100 overflow-y-auto",
        "animate-fade-in",
        isDragging ? "pointer-events-none" : "pointer-events-auto",
        className
      )}
    >
      {children}
    </section>
  );
}
