import { useTheme } from "@/hooks/useTheme";
import { Outlet } from "react-router-dom";
import SettingsPanel from "./SettingsPanel";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { sidebarMode, sidebarOpen } = useTheme();

  // Calculate margin based on sidebar state and mode
  const getMainContentMargin = () => {
    if (sidebarMode === 'static') {
      return 'lg:ml-64'; // Always 256px margin in static mode
    } else {
      // Dynamic mode
      if (sidebarOpen) {
        return 'lg:ml-64'; // Expanded: 256px margin
      } else {
        return 'lg:ml-16'; // Collapsed: 64px margin
      }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-background flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${getMainContentMargin()}`}>
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8 container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <SettingsPanel />
    </div>
  );
};

export default Layout;
