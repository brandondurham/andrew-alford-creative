"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Context for tracking whether letters are being dragged
 * 
 * Usage in any component:
 * 
 * import { useDragging } from "@/context/DraggingContext";
 * 
 * function MyComponent() {
 *   const { isDragging, setIsDragging } = useDragging();
 *   
 *   return (
 *     <div className={isDragging ? "pointer-events-none" : ""}>
 *       Content is disabled while dragging
 *     </div>
 *   );
 * }
 */

interface DraggingContextType {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

const DraggingContext = createContext<DraggingContextType | undefined>(undefined);

export function DraggingProvider({ children }: { children: ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DraggingContext.Provider value={{ backgroundColor, setBackgroundColor, isDragging, setIsDragging }}>
      {children}
    </DraggingContext.Provider>
  );
}

export function useDragging() {
  const context = useContext(DraggingContext);
  if (context === undefined) {
    throw new Error("useDragging must be used within a DraggingProvider");
  }
  return context;
}

