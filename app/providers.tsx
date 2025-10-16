// app/providers.tsx
"use client";

import { DraggingProvider } from "@/context/DraggingContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DraggingProvider>
        {children}
      </DraggingProvider>
    </ThemeProvider>
  );
}
