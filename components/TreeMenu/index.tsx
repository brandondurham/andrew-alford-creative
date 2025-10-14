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
      return "pl-[2ch]";
  }
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
    event.preventDefault();
    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    } else if (item.onClick) {
      item.onClick();
    }
  }, [toggleExpanded]);

  const renderMenuItem = useCallback((item: MenuItem, index: number) => {
    const hasChildren = Boolean(item.children && item.children.length > 0);
    const isExpanded = expandedItems.has(item.id);

    return (
      <li
        aria-expanded={isExpanded}
        aria-level={level}
        aria-selected="false"
        data-expandable={hasChildren}
        key={item.id}
        role="treeitem"
      >
        <Link
          href={item.href ?? "/"}
          className={classes(
            "flex items-center gap-2 no-underline",
            isExpanded && "no-underline"
          )}
          onClick={(e) => handleItemClick(e, item)}
        >
          {hasChildren && (
            <span className="block absolute -left-[2ch]">
              {isExpanded ? "▼" : "▶"}
            </span>
          )}
          {item.year && (
            <Chip className="font-normal text-[0.45em]">{item.year}</Chip>
          )}
          {numbered && `${index + 1}.`} {item.label}
        </Link>

        {hasChildren && isExpanded && (
          <TreeMenu
            items={item.children!}
            level={level + 1}
            className={className}
          />
        )}
      </li>
    );
  }, [className, expandedItems, handleItemClick, level]);

  return (
    <ul
      className={classes(
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
