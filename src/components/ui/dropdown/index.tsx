import type React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface DropdownItemProps {
  tag?: "a" | "button";
  href?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

interface DropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  toggleButtonRef?: React.RefObject<HTMLElement>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  children,
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute left-1/2 transform -translate-x-1/2 z-50 rounded-lg border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = "button",
  href,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:text-gray-800",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && href) {
    return (
      <Link to={href} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
