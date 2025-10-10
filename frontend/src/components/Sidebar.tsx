import { useTheme } from "@/hooks/useTheme";
import {
  ChevronLeft,
  FileText,
  Home,
  Menu,
  PackageSearch,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";


const Sidebar = () => {
  const { sidebarMode, sidebarOpen, setSidebarOpen } = useTheme();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const menuItems = [
    { icon: Home, label: "Home", path: "/home", color: "text-blue-600" },
    { icon: User, label: "Usuários", path: "/users", color: "text-purple-600" },
    { icon: FileText, label: "Categorias", path: "/categories", color: "text-green-600" },
    { icon: PackageSearch, label: "Produtos", path: "/products", color: "text-purple-600" }
  ]

  const isActive = (path: string) => location.pathname === path;
  const isCompact = sidebarMode === 'dynamic' && !sidebarOpen;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-card shadow-lg modern-btn-secondary"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && sidebarMode === 'dynamic' && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-card/95 backdrop-blur-xl shadow-2xl
          border-r border-border transition-all duration-300 ease-in-out flex flex-col
          ${sidebarMode === 'static' ? 'w-64' : isCompact ? 'w-16' : 'w-64'}
          ${sidebarMode === 'dynamic' && !sidebarOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
          h-screen overflow-hidden
        `}
        onMouseEnter={() => sidebarMode === 'dynamic' && setSidebarOpen(true)}
        onMouseLeave={() => sidebarMode === 'dynamic' && setSidebarOpen(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {!isCompact && (
                <div className="ml-2">
                  <span className="text-base font-bold text-muted-foreground">Pollimper</span>
                </div>
              )}
            </div>
            {!isCompact && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-accent transition-colors"
              >
                <ChevronLeft size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto min-h-0">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.path} className="relative">
                <Link
                  to={item.path}
                  onClick={() => sidebarMode === 'dynamic' && setSidebarOpen(false)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    modern-nav-item group
                    ${isCompact ? 'justify-center p-2' : 'px-3 py-2'}
                    ${isActive(item.path)
                      ? 'bg-primary/10 text-primary border-r-2 border-primary shadow-sm'
                      : 'hover:bg-accent/50'
                    }
                  `}
                >
                  <div className={`flex items-center ${isCompact ? 'justify-center' : ''}`}>
                    <item.icon
                      size={18}
                      className={`${isActive(item.path) ? 'text-primary' : item.color} transition-colors`}
                    />
                    {!isCompact && (
                      <span className="ml-2 font-medium text-sm">{item.label}</span>
                    )}
                  </div>

                  {/* Tooltip for compact mode */}
                  {isCompact && hoveredItem === item.path && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-foreground rotate-45"></div>
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </nav>
        
        {/* User Profile */}
        <div className="p-3 border-t border-border/50 flex-shrink-0">
          {isCompact ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                <User size={16} className="text-primary-foreground" />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <UserProfile />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
