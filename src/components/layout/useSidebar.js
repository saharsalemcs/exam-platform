import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useSidebar() {
  const { pathname } = useLocation();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  // Manual collapse override — only meaningful on desktop
  const [manualCollapsed, setManualCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile drawer on navigation — only sets mobileOpen, not cascading
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // isOpen: mobile → controlled by mobileOpen, tablet/desktop → always true
  const isOpen = isMobile ? mobileOpen : true;

  const isCollapsed = isTablet ? true : isDesktop ? manualCollapsed : false;

  const sidebarWidth = isMobile
    ? "0px"
    : isCollapsed
      ? "68px"
      : "var(--sidebar-width)";

  return {
    isOpen,
    isCollapsed,
    sidebarWidth,
    toggleOpen: useCallback(() => setMobileOpen((v) => !v), []),
    toggleCollapsed: useCallback(() => setManualCollapsed((v) => !v), []),
    close: useCallback(() => setMobileOpen(false), []),
  };
}
