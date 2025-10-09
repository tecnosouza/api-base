import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContextContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronUp } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Extraindo nome e role de forma segura
  const userName = user?.name ? user.name.split(" ")[0] : "Carregando...";
  const userRole = user?.role || "";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{userName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
        </div>

        <ChevronUp
          size={16}
          className={`text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={16} className="text-red-500" />
            <span className="text-sm text-red-500">Sair</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
