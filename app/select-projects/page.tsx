"use client";

// Utils
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

export default function SelectProjects({ className }: { className?: string }) {
  return (
    <Content className={className}>
      <ContentMasthead>Select Projects</ContentMasthead>
    </Content>
  );
}
