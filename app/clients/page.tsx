"use client";

// Utils
import { ContentMasthead } from "@/components/ContentMasthead";
import { Content } from "@/components/Content";

export default function ClientPortal({ className }: { className?: string }) {
  return (
    <Content className={className}>
      <ContentMasthead>Client Portal</ContentMasthead>
    </Content>
  );
}
