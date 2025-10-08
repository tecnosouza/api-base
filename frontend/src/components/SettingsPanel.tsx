import React, { useEffect, useState } from 'react';
import { Settings, X, Sun, Moon, Type, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, fontSize, sidebarMode, toggleTheme, setFontSize, setSidebarMode } = useTheme();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      const isSmall = window.innerWidth < 1200;
      setIsSmallScreen(isSmall);
      if (isSmall && sidebarMode !== 'dynamic') {
        setSidebarMode('dynamic');
      }
    };

    updateScreenSize(); // Chama na montagem
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [sidebarMode, setSidebarMode]);
  
  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <Settings size={20} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300">
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Configurações</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Settings Options */}
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Modo
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'light' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Sun size={16} />
                      <span>Claro</span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Moon size={16} />
                      <span>Escuro</span>
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Tamanho da Fonte
                  </label>
                  <div className="space-y-2">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size as 'small' | 'medium' | 'large')}
                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          fontSize === size 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Type size={16} />
                        <span className="capitalize">
                          {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Comportamento do Menu
                  </label>
                  {isSmallScreen ?
                  <div className="space-y-2">
                    {['dynamic'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSidebarMode(mode as 'static' | 'dynamic')}
                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          sidebarMode === mode 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Menu size={16} />
                        <span className="capitalize">
                          {mode === 'static' ? 'Estático (sempre aberto)' : 'Dinâmico (abre/fecha)'}
                        </span>
                      </button>
                    ))}
                  </div> 
                :
                 <div className="space-y-2">
                    {['static', 'dynamic'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSidebarMode(mode as 'static' | 'dynamic')}
                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          sidebarMode === mode 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Menu size={16} />
                        <span className="capitalize">
                          {mode === 'static' ? 'Estático (sempre aberto)' : 'Dinâmico (abre/fecha)'}
                        </span>
                      </button>
                    ))}
                  </div>
                  } 
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingsPanel;
