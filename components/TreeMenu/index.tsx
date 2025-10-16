'use client';

import { type FC, type MouseEvent, useCallback, useState } from "react";
import Link from "next/link";

// Components
import { Chip } from "@/components/Chip";

// Utils
import { classes } from "@/utils";

// Styles
import styles from "./index.module.css";

// Define the structure for menu items
export interface MenuItem {
  children?: MenuItem[];
  href?: string;
  id: string;
  label: string;
  onClick?: () => void;
  year?: number;
}

interface TreeMenuProps {
  className?: string;
  items: MenuItem[];
  level?: number;
  numbered?: boolean;
  defaultExpanded?: boolean | number;
}

const indent = (level: TreeMenuProps["level"] = 0) => {
  switch (level) {
    case 0:
      return "pl-0";
    default:
      return "pl-[2.7ch]";
  }
};

// Helper function to determine if a URL is external
const isExternalUrl = (href: string): boolean => {
  try {
    const url = new URL(href, window.location.origin);
    return url.hostname !== window.location.hostname;
  } catch {
    // If URL parsing fails, assume it's internal
    return false;
  }
};

// Unified link component that handles both internal and external links
interface UnifiedLinkProps {
  href: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}

const UnifiedLink: FC<UnifiedLinkProps> = ({ href, className, onClick, children }) => {
  const isExternal = isExternalUrl(href);
  
  const linkProps = {
    href,
    className,
    onClick,
    ...(isExternal && { target: "_blank", rel: "noopener noreferrer" })
  };

  return isExternal ? (
    <a {...linkProps}>{children}</a>
  ) : (
    <Link {...linkProps}>{children}</Link>
  );
};

export const TreeMenu: FC<TreeMenuProps> = ({ 
  className = '', 
  items, 
  level = 0,
  numbered = false,
  defaultExpanded,
}) => {
  // Initialize expanded state based on defaultExpanded prop
  const getInitialExpandedItems = (): Set<string> => {
    if (defaultExpanded === true) {
      // Expand all nodes recursively
      const allIds = new Set<string>();
      const collectIds = (menuItems: MenuItem[]) => {
        menuItems.forEach(item => {
          if (item.children && item.children.length > 0) {
            allIds.add(item.id);
            collectIds(item.children);
          }
        });
      };
      collectIds(items);
      return allIds;
    } else if (typeof defaultExpanded === 'number') {
      // Expand only nodes at the specified index
      const expandedIds = new Set<string>();
      if (items[defaultExpanded] && items[defaultExpanded].children && items[defaultExpanded].children!.length > 0) {
        expandedIds.add(items[defaultExpanded].id);
      }
      return expandedIds;
    }
    return new Set();
  };

  const [expandedItems, setExpandedItems] = useState<Set<string>>(getInitialExpandedItems());

  const toggleExpanded = useCallback((itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  }, [expandedItems]);

  const handleItemClick = useCallback((event: MouseEvent<HTMLAnchorElement>, item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      // For items with children, prevent default navigation and toggle expansion
      event.preventDefault();
      toggleExpanded(item.id);
    } else if (item.onClick) {
      // For items with onClick handlers, prevent default and call the handler
      event.preventDefault();
      item.onClick();
    }
    // For leaf items without onClick, allow default link behavior
  }, [toggleExpanded]);

  const renderMenuItem = useCallback((item: MenuItem, index: number) => {
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isExpanded = expandedItems.has(item.id);
    const href = item.href ?? "/";

    return (
      <li
        aria-expanded={isExpanded}
        aria-level={level}
        aria-selected="false"
        data-expandable={hasChildren}
        key={item.id}
        role="treeitem"
      >
        <UnifiedLink
          href={href}
          className={classes(
            "flex items-center gap-2 no-underline relative",
            hasChildren && "pl-[1.5ch]",
            isExpanded && "no-underline"
          )}
          onClick={(e) => handleItemClick(e, item)}
        >
          {hasChildren && (
            <span className="block absolute left-0 text-[0.7em]">
              {isExpanded ? "▼" : "▶"}
            </span>
          )}
          {item.year && (
            <Chip className="font-normal text-[0.4em] translate-y-[0.05em]">{item.year}</Chip>
          )}
          {numbered && `${index + 1}.`} {item.label}
        </UnifiedLink>

        {hasChildren && isExpanded && (
          <TreeMenu
            items={item.children!}
            level={level + 1}
            className={className}
          />
        )}
      </li>
    );
  }, [className, expandedItems, handleItemClick, level, numbered]);

  return (
    <ul
      className={classes(
        level === 0 && "[&>li]:mt-4",
        styles.tree,
        indent(level),
        className
      )}
      role="tree"
    >
      {items.map((item, index) =>
        renderMenuItem(item, index)
      )}
    </ul>
  );
};
