import React, { useEffect, useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDown, Grid, Table, Menu } from "lucide-react";

const navItems = [
  {
    icon: <Grid />,
    name: "Dashboard",
    path: "/",
    subItems: [{ name: "Statistics", path: "/" }],
  },
  {
    name: "Tables",
    icon: <Table />,
    path: "/tables",
    subItems: [{ name: "Refund Orders", path: "/refunds" }],
  },
];

const AppSidebar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu(index);
            submenuMatched = true;
          }
        });
      }
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      if (subMenuRefs.current[openSubmenu]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      <button
        type="button"
        aria-label="Toggle Sidebar"
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
        onClick={toggleMobileSidebar}
      >
        <Menu size={24} />
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 dark:border-gray-800 border-r border-gray-200 transition-all duration-300 z-50 
          ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"} 
          ${isMobileOpen ? "block" : "hidden lg:block"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="py-8  px-5 flex justify-center">
          <Link to="/">
            <img
              src="./images/logo/logo.png"
              alt="Logo"
              width={60}
              height={40}
            />
          </Link>
        </div>
        <nav className="mb-6 px-5">
          <h2 className="mb-4 text-xs uppercase text-gray-400">Menu</h2>
          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name}>
                {nav.subItems ? (
                  <button
                    onClick={() =>
                      setOpenSubmenu(openSubmenu === index ? null : index)
                    }
                    className={`menu-item ${
                      openSubmenu === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    {nav.icon}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>{nav.name}</span>
                    )}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <ChevronDown
                        className={`ml-auto w-5 h-5 transition-transform ${
                          openSubmenu === index
                            ? "rotate-180 text-purple-500"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={nav.path}
                    className={`menu-item ${
                      isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    }`}
                  >
                    {nav.icon}
                    {(isExpanded || isHovered || isMobileOpen) && (
                      <span>{nav.name}</span>
                    )}
                  </Link>
                )}
                {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      if (el) subMenuRefs.current[index] = el;
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu === index
                          ? `${subMenuHeight[index] ?? 0}px`
                          : "0px",
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(subItem.path)
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
