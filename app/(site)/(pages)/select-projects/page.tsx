"use client";

// Components
import { TreeMenu } from "@/components/TreeMenu";

// Utils
import { classes } from "@/utils";

// Constants
import { PROJECTS } from "./content";

export default function SelectProjects({ className }: { className?: string }) {
  return (
    <article
      className={classes(
        "text-[1.2em]",
        // "flex flex-col font-ringside-regular font-medium leading-[1.2] text-pretty bg-gray-100",
        // "p-[2vw] lg:p-[1vw] pb-[6vh] lg:pb-[6vh] font-semibold"
      )}
    >
      <h2 className="mb-4">Select Projects</h2>
      <TreeMenu defaultExpanded items={PROJECTS} />
    </article>
  );
}
