import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document
      .getElementById("main-content")
      ?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div
        className="flex min-h-screen flex-1 flex-col"
        style={{ marginLeft: "var(--sidebar-width)" }}
      >
        <Header />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto"
          style={{
            marginTop: "var(--header-height)",
            backgroundColor: "var(--color-bg)",
            minHeight: `calc(100vh - var(--header-height))`,
          }}
        >
          <div className="max-w-[1400px] px-7 py-7">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
