import { useTheme } from "@/hooks/useTheme";
import { Bell, Search, User } from "lucide-react";
import { Outlet } from "react-router-dom";
import SettingsPanel from "./SettingsPanel";
import Sidebar from "./Sidebar";

import { useRef, useState } from "react";

interface Message {
  requestId: string;
  messagePreview: string;
  timestamp: string;
  from: string;
}

const MessagesDropdown = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {messages.length > 0 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
              <div className="font-semibold">{message.from}</div>
              <div className="text-sm text-gray-500">{message.messagePreview}</div>
              <div className="text-xs text-gray-400">{message.timestamp}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-2 text-gray-500">Nenhuma mensagem não lida.</div>
      )}
    </div>
  );
};

const Layout = () => {
  const { sidebarMode, sidebarOpen } = useTheme();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        {/* Top Header */}
        <header className="bg-card/95 backdrop-blur-xl border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-accent rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
      
              {/* Messages */}
              <div className="relative">
                <button className="relative p-2 hover:bg-accent rounded-xl transition-colors" onClick={toggleDropdown}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 text-muted-foreground"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/><path d="m22 6-10 7L2 6"/></svg>
                  {unreadMessagesCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">{unreadMessagesCount}</span>
                  )}
                </button>
                {isDropdownOpen && !isLoading && messages && <MessagesDropdown messages={messages} />}
              </div>
            
              {/* User Menu */}
              <button className="flex items-center space-x-3 p-2 hover:bg-accent rounded-xl transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              </button>
            </div>
          </div>
        </header>
         <div id="filter-portal"></div>
        {/* Main Content */}
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
