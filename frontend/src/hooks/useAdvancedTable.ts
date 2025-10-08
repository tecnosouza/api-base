/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useMemo } from 'react';

export interface FilterOperator {
  value: string;
  label: string;
}

export interface ColumnFilter {
  operator: string;
  value: string;
}

export interface FilterItem {
  column: string;
  operator: string;
  value: string;
}

export interface TableFilters {
  [key: string]: ColumnFilter;
}

export interface SortConfig {
  sortBy: string | null;
  order: 'asc' | 'desc' | null;
}

export interface TableState {
  page: number;
  limit: number;
  filters: TableFilters;
  sort: SortConfig;
}

export interface AdvancedTableConfig {
  initialPage?: number;
  initialLimit?: number;
  limitOptions?: number[];
}

export const filterOperators: FilterOperator[] = [
  { value: 'contains', label: 'Contém' },
  { value: 'startsWith', label: 'Começa com' },
  { value: 'endsWith', label: 'Termina com' },
  { value: 'equals', label: 'Igual' },
  { value: 'notEquals', label: 'Diferente' },
  { value: 'notContains', label: 'Não contém' }
];

export const useAdvancedTable = (config: AdvancedTableConfig = {}) => {
  const {
    initialPage = 1,
    initialLimit = 10,
    limitOptions = [10, 25, 50]
  } = config;

  const [tableState, setTableState] = useState<TableState>({
    page: initialPage,
    limit: initialLimit,
    filters: {},
    sort: { sortBy: null, order: null }
  });

  const updatePage = useCallback((page: number) => {
    setTableState(prev => {
      if (page === prev.page) {
        return prev;
      }
      return { ...prev, page };
    });
  }, []);

  const updateLimit = useCallback((limit: number) => {
    setTableState(prev => {
      if (limit === prev.limit) {
        return prev;
      }
      return { ...prev, limit, page: 1 };
    });
  }, []);

  const updateFilter = useCallback((column: string, filter: ColumnFilter | null) => {
    setTableState(prev => {
      const newFilters = { ...prev.filters };
      if (filter && filter.value.trim()) {
        newFilters[column] = filter;
      } else {
        delete newFilters[column];
      }
      return { ...prev, filters: newFilters, page: 1 };
    });
  }, []);

  const updateSort = useCallback((column: string) => {
    setTableState(prev => {
      let newOrder: 'asc' | 'desc' | null = 'asc';
      
      if (prev.sort.sortBy === column) {
        if (prev.sort.order === 'asc') {
          newOrder = 'desc';
        } else if (prev.sort.order === 'desc') {
          newOrder = null;
        }
      }

      return {
        ...prev,
        sort: {
          sortBy: newOrder ? column : null,
          order: newOrder
        },
        page: 1
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setTableState(prev => ({ ...prev, filters: {}, page: 1 }));
  }, []);

  const getApiParams = useCallback(() => {
    const params: any = {
      page: tableState.page,
      limit: tableState.limit
    };

    const filtersArray: FilterItem[] = Object.entries(tableState.filters)
      .filter(([_, filter]) => filter.value.trim())
      .sort(([columnA], [columnB]) => columnA.localeCompare(columnB))
      .map(([column, filter]) => ({
        column,
        operator: filter.operator,
        value: filter.value.trim()
      }));

    if (filtersArray.length > 0) {
      params.filters = filtersArray;
    }

    if (tableState.sort.sortBy && tableState.sort.order) {
      params.sortBy = tableState.sort.sortBy;
      params.order = tableState.sort.order;
    }

    return params;
  }, [tableState]);

  return {
    tableState,
    limitOptions,
    updatePage,
    updateLimit,
    updateFilter,
    updateSort,
    resetFilters,
    getApiParams
  };
};
