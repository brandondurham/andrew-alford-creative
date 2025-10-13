"use client";

import { Children, isValidElement, useEffect, useState } from "react";

// Context
import { useTheme } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

export function Content({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [showGuides, setShowGuides] = useState(false);

  const { theme } = useTheme();

  const child = Children.map(children, (child) => {
    // Check if child is a valid React element
    if (isValidElement(child)) {
      const childType = child.type as any;
      
      // Log full type information for debugging
      console.log("child.type:", childType);
      console.log("typeof child.type:", typeof childType);
      console.log("child.type.displayName:", childType?.displayName);
      console.log("child.type.name:", childType?.name);
      console.log("Keys on child.type:", Object.keys(childType || {}));
      
      // Try different ways to get the name
      const displayName = 
        childType?.displayName || 
        childType?.name || 
        childType?.render?.displayName ||
        childType?.render?.name ||
        childType?.type?.displayName ||
        childType?.type?.name ||
        'Unknown';
      
      console.log("Resolved displayName:", displayName);
      console.log("---");
      
      // Example: Filter by displayName
      // if (displayName === "Article") return child;
    }
    return null;
  });

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowGuides((state) => !state);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  if (!theme)
    return (
      <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300">
        Loading…
      </div>
    );

  return (
    <div
      className={classes(
        "min-h-screen flex flex-col transition-opacity duration-300",
        className
      )}
    >
      {children}
      {showGuides && (
        <div className="fixed inset-[1vw] z-50 [box-shadow:0_0_0_1px_cyan] pointer-events-none" />
      )}
    </div>
  );
}
