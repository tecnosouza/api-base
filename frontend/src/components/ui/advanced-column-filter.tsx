
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Filter, X } from 'lucide-react';
import { filterOperators, ColumnFilter } from '@/hooks/useAdvancedTable';

interface AdvancedColumnFilterProps {
  column: string;
  currentFilter?: ColumnFilter;
  onFilterChange: (column: string, filter: ColumnFilter | null) => void;
  placeholder?: string;
}

export const AdvancedColumnFilter: React.FC<AdvancedColumnFilterProps> = React.memo(({
  column,
  currentFilter,
  onFilterChange,
  placeholder = "Filtrar..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [operator, setOperator] = useState(currentFilter?.operator || 'contains');
  const [value, setValue] = useState(currentFilter?.value || '');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOperator(currentFilter?.operator || 'contains');
    setValue(currentFilter?.value || '');
  }, [currentFilter]);

  // Função para calcular e atualizar a posição do dropdown
  const updateDropdownPosition = useCallback(() => {
    if (!dropdownRef.current) return;
    
    const buttonRect = dropdownRef.current.getBoundingClientRect();
    const newPosition = {
      top: buttonRect.bottom + window.scrollY + 4, // 4px de margem
      left: buttonRect.left + window.scrollX,
    };
    
    // Verifica se o dropdown sairia da tela e ajusta
    const viewportWidth = window.innerWidth;
    const dropdownWidth = 256; // w-64 = 16rem = 256px
    
    if (newPosition.left + dropdownWidth > viewportWidth) {
      newPosition.left = viewportWidth - dropdownWidth - 16; // 16px de margem
    }
    
    setDropdownPosition(newPosition);
  }, []);

  // Abre o dropdown e calcula a posição no momento do clique
  const handleToggleDropdown = useCallback(() => {
    if (!isOpen) {
      // Primeiro atualiza a posição, depois abre
      updateDropdownPosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isOpen, updateDropdownPosition]);

  // Effect para lidar com cliques fora e resize
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const filterPortal = document.getElementById('filter-portal');
      if (filterPortal && filterPortal.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, updateDropdownPosition]);

  const handleApplyFilter = () => {
    if (value.trim()) {
      onFilterChange(column, { operator, value: value.trim() });
    } else {
      onFilterChange(column, null);
    }
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setValue('');
    setOperator('contains');
    onFilterChange(column, null);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isFiltered = currentFilter && currentFilter.value;

  return (
    <div className="" ref={dropdownRef} key={currentFilter ? currentFilter.value + currentFilter.operator : 'no-filter'}>
      <button
        onClick={handleToggleDropdown}
        className={`p-1 rounded hover:bg-muted/50 transition-colors ${
          isFiltered ? 'text-primary bg-primary/10' : 'text-muted-foreground'
        }`}
        title="Filtrar coluna"
      >
        <Filter size={14} />
      </button>

      {isOpen && ReactDOM.createPortal(
        <div 
          className="fixed mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-[9999]" 
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
          }}
        >
          <div className="p-3 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Operador
              </label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
              >
                {filterOperators.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
      
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Valor
              </label>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                className="w-full text-sm border border-border rounded px-2 py-1 bg-background"
                autoFocus
              />
            </div>
      
            <div className="flex justify-between gap-2">
              <button
                onClick={handleClearFilter}
                className="flex items-center gap-1 text-xs px-2 py-1 text-muted-foreground hover:text-foreground transition-colors">
                <X size={12} />
                Limpar
              </button>
              <button
                onClick={handleApplyFilter}
                className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                Aplicar
              </button>
            </div>
          </div>
        </div>,
        document.getElementById('filter-portal')!
      )}
    </div>
  );
});
