"use client";

import { usePathname } from "next/navigation";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";

// Utils
import { classes } from "@/utils";
import { useDragging } from "@/context/DraggingContext";

// Styles
import styles from "./content.module.css";

// Consts
const PAGES = {
  "/select-projects": "Select Projects",
  "/thoughts": "Thoughts",
  "/info": "Info",
  "/clients": "Client Portal",
  "/contact": "Contact",
}; 

export function Content({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const { isDragging } = useDragging();

  const title = PAGES[pathname as keyof typeof PAGES];

  return (
    <section
      className={classes(
        "flex flex-col",
        "text-pretty font-semibold text-justify hyphens-auto",
        "overflow-hidden shadow-lg/50 rounded-lg fixed bottom-[2vw] top-[2vw] left-[2vw] right-[2vw] lg:bottom-[1vw] lg:top-[1vw] lg:left-[50vw] lg:right-[1vw] z-100",
        "animate-fade-in",
        "bg-gray-100",
        isDragging ? "pointer-events-none" : "pointer-events-auto",
        styles.content
      )}
    >
      <ContentMasthead>{title}</ContentMasthead>
      <div
        className={classes(
          pathname !== "/thoughts" && pathname !== "/info" &&
            "px-[4vw] lg:px-[2vw] pt-[4vw] lg:pt-[2vw] pb-[8vh]",
          "flex flex-col grow",
          "overflow-y-auto"
        )}
      >
        {children}
      </div>
    </section>
  );
}
