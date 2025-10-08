/* eslint-disable @typescript-eslint/no-explicit-any */

import { ColumnFilter } from '@/hooks/useAdvancedTable';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp } from 'lucide-react';
import React from 'react';
import { AdvancedColumnFilter } from '@/components/ui/advanced-column-filter';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[] | undefined | null;
  className?: string;
  loading?: boolean;
  error?: string | null;
  customRowRenderer?: (groupedData: { [key: string]: Request[] }) => React.ReactNode;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    limitOptions: number[];
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
  };
  sorting?: {
    sortBy: string | null;
    order: 'asc' | 'desc' | null;
    onSortChange: (column: string) => void;
  };
  filtering?: {
    filters: { [key: string]: ColumnFilter };
    onFilterChange: (column: string, filter: ColumnFilter | null) => void;
  };
}

export const DataTable = ({ 
  columns, 
  data = [],
  className = "",
  loading = false,
  error = null,
  pagination,
  sorting,
  filtering,
  customRowRenderer
}: DataTableProps) => {
  const safeData = Array.isArray(data) ? data : [];

  const getSortIcon = (columnKey: string) => {
    if (!sorting || sorting.sortBy !== columnKey) {
      return null;
    }
    
    return sorting.order === 'asc' ? (
      <ChevronUp size={14} className="text-primary" />
    ) : (
      <ChevronDown size={14} className="text-primary" />
    );
  };

  // Função para gerar as páginas visíveis (até 5 páginas ao redor da atual)
  const getVisiblePages = () => {
    if (!pagination) return [1]; // Retorna [1] mesmo sem dados

    const { currentPage, totalPages } = pagination;
    const pages: number[] = [];
    const delta = 2; // 2 páginas antes e 2 depois da atual

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Garante que ao menos a página 1 seja retornada se não houver nenhuma no loop
    return pages.length ? pages : [1];
  };

  if (error) {
    return (
      <div className={`modern-card p-6 ${className}`}>
        <div className="text-center text-destructive">
          <p>Error loading data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 modern-btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const visiblePages = getVisiblePages();

  const currentPageNum = pagination?.currentPage ?? 1;
  const itemsPerPageNum = pagination?.itemsPerPage ?? 10;
  const totalItemsNum = pagination?.totalItems ?? 0;

  const startItem = (currentPageNum - 1) * itemsPerPageNum + 1;
  const endItem = Math.min(currentPageNum * itemsPerPageNum, totalItemsNum);


  const groupedByPerson = data?.reduce((acc, item) => {
    const key = item.person_id ?? "Desconhecido";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, Request[]>);

  return (
    <div className={`modern-card overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {column.sortable && sorting ? (
                        <button
                          onClick={() => sorting.onSortChange(column.key)}
                          className="flex items-center gap-1 hover:text-foreground transition-colors"
                        >
                          {column.label}
                          {getSortIcon(column.key)}
                        </button>
                      ) : (
                        <span>{column.label}</span>
                      )}
                    </div>
                    
                    {column.filterable && filtering && (
                      <AdvancedColumnFilter
                        column={column.key}
                        currentFilter={filtering.filters[column.key]}
                        onFilterChange={filtering.onFilterChange}
                        placeholder={column.filterPlaceholder}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-muted-foreground">Carregando...</span>
                  </div>
                </td>
              </tr>
            ) : safeData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              // safeData.map((row, index) => (
              //   <tr key={row?.id || index} className="hover:bg-muted/50 transition-colors">
              //     {columns.map((column) => (
              //       <td key={column.key} className="px-6 py-4 whitespace-nowrap">
              //         {column.render ? column.render(row?.[column.key], row) : (row?.[column.key] || '-')}
              //       </td>
              //     ))}
              //   </tr>
              // ))
              customRowRenderer ? (
                customRowRenderer(groupedByPerson)
              ) : (
                safeData.map((row, index) => (
                  <tr key={row?.id || index} className="hover:bg-muted/50 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        {column.render ? column.render(row?.[column.key], row) : (row?.[column.key] || '-')}
                      </td>
                    ))}
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginação integrada no rodapé */}
      {pagination && !loading && safeData.length > 0 && (
        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Controles de paginação centralizados */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-1">
                {/* Primeira página */}
                <button
                  onClick={() => pagination.onPageChange(1)}
                  disabled={pagination.currentPage === 1}
                  className="px-2 py-1 text-sm border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Primeira página"
                >
                  <ChevronsLeft size={16} />
                </button>

                {/* Página anterior */}
                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-2 py-1 text-sm border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Página anterior"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Páginas numeradas (até 5 ao redor da atual) */}
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => pagination.onPageChange(page)}
                    className={`px-3 py-1 text-sm border border-border rounded transition-colors ${
                      page === pagination.currentPage
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Próxima página */}
                <button
                  onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-2 py-1 text-sm border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Próxima página"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Última página */}
                <button
                  onClick={() => pagination.onPageChange(pagination.totalPages)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-2 py-1 text-sm border border-border rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Última página"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>

            {/* Controle de quantidade por página à direita com margem de 1rem */}
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Itens por página:</span>
                <select
                  value={pagination.itemsPerPage}
                  onChange={(e) => pagination.onLimitChange(Number(e.target.value))}
                  className="text-sm border border-border rounded px-2 py-1 bg-background"
                >
                  {pagination?.limitOptions?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Info de registros na extrema direita */}
              <span className="text-sm text-muted-foreground">
                {startItem}-{endItem} de {pagination.totalItems}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
