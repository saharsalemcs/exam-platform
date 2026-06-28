import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSidebar } from "./useSidebar";

function AppLayout() {
  const { pathname } = useLocation();
  const {
    isOpen,
    isCollapsed,
    sidebarWidth,
    toggleOpen,
    toggleCollapsed,
    close,
  } = useSidebar();

  // Scroll content to top on route change
  useEffect(() => {
    document
      .getElementById("main-content")
      ?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        onClose={close}
        onToggleCollapse={toggleCollapsed}
      />

      <div
        className="flex min-h-screen flex-1 flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
        <Header sidebarWidth={sidebarWidth} onMenuClick={toggleOpen} />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
          style={{
            marginTop: "var(--header-height)",
            backgroundColor: "var(--color-bg)",
            minHeight: `calc(100vh - var(--header-height))`,
          }}
        >
          <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
