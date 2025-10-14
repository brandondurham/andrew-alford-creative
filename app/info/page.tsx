"use client";

// Utils
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

export default function Info({ className }: { className?: string }) {
  return (
    <Content className={className}>
      <ContentMasthead>Info</ContentMasthead>
    </Content>
  );
}
