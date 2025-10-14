"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react";

// Project Settings
import { StackingContext } from "@/settings";

// Context
import { useTheme } from "@/context/ThemeContext";

// Utils
import { classes } from "@/utils";

// Types
import { ComponentNames } from "@/settings/types";

/**
 * Helper function to resolve displayName from a child element
 */
const getDisplayName = (childType: any): string => {
  // Handle lazy components (Next.js wraps client components in React.lazy)
  if (childType?.$$typeof === Symbol.for('react.lazy')) {
    try {
      const resolvedComponent = childType._init(childType._payload);
      return resolvedComponent?.displayName || resolvedComponent?.name || 'Unknown';
    } catch (error) {
      console.warn("Could not resolve lazy component:", error);
      return 'Unknown';
    }
  } 
  // Handle regular string elements (like <main>)
  else if (typeof childType === 'string') {
    return childType;
  }
  // Handle regular function/class components
  else {
    return childType?.displayName || childType?.name || 'Unknown';
  }
};

export function Content({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [showGuides, setShowGuides] = useState(false);

  const { theme } = useTheme();

  // Apply stacking context classes to children based on their displayName
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const childType = child.type as any;
    const displayName = getDisplayName(childType);

    // Check if displayName exists as a key in StackingContext
    if (displayName in StackingContext) {
      const stackingClass = StackingContext[displayName as ComponentNames];
      
      // Cast child to ReactElement with className prop
      const typedChild = child as React.ReactElement<{ className?: string }>;
      
      // Clone the child and merge the stacking class with existing className
      return cloneElement(typedChild, {
        className: classes(typedChild.props.className, stackingClass),
      });
    }

    // Return child unchanged if no matching stacking context
    return child;
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
      {enhancedChildren}
      {showGuides && (
        <div className="fixed inset-[1vw] z-50 [box-shadow:0_0_0_1px_cyan] pointer-events-none" />
      )}
    </div>
  );
}
