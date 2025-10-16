"use client";

// Components
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";
import { TreeMenu } from "@/components/TreeMenu";

// Utils
import { classes } from "@/utils";

// Constants
import { PROJECTS } from "./content";

export default function SelectProjects({ className }: { className?: string }) {
  return (
    <Content className={className}>
      <ContentMasthead>Select Projects</ContentMasthead>
      <article
        className={classes(
          "flex flex-col font-ringside-regular font-medium leading-[1.2] text-pretty bg-gray-100",
          "p-[2vw] lg:p-[1vw] pb-[6vh] lg:pb-[6vh] font-semibold"
        )}
      >
        <h2 className="mb-4">Select Projects</h2>
        <TreeMenu defaultExpanded items={PROJECTS} />
      </article>
    </Content>
  );
}
