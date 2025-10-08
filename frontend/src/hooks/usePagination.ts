
import { useState, useCallback } from 'react';

/**
 * Configuration for pagination hook
 */
interface PaginationConfig {
  initialPage?: number;
  initialLimit?: number;
  limitOptions?: number[];
}

/**
 * Pagination state and actions
 */
interface PaginationState {
  page: number;
  limit: number;
  limitOptions: number[];
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetPagination: () => void;
  getOffset: () => number;
}

/**
 * Custom hook for managing pagination state
 * Provides consistent pagination functionality across components
 * 
 * @param config - Pagination configuration
 * @returns Pagination state and actions
 */
export const usePagination = (config: PaginationConfig = {}): PaginationState => {
  const {
    initialPage = 1,
    initialLimit = 10,
    limitOptions = [10, 25, 50]
  } = config;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  const getOffset = useCallback(() => {
    return (page - 1) * limit;
  }, [page, limit]);

  const handleSetLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  return {
    page,
    limit,
    limitOptions,
    setPage,
    setLimit: handleSetLimit,
    resetPagination,
    getOffset,
  };
};
