/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { PaginationParams, PaginatedResponse } from '@/services/api';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface ApiQueryConfig<T> {
  queryFn: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  initialParams?: PaginationParams;
  enabled?: boolean;
}

interface ApiQueryState<T> {
  data: T[];
  pagination: PaginatedResponse<T>['pagination'] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateParams: (newParams: Partial<PaginationParams>) => void;
}

export const useApiQuery = <T>(config: ApiQueryConfig<T>): ApiQueryState<T> => {
  const { queryFn, initialParams = {}, enabled = true } = config;

  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<T>['pagination'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<PaginationParams>(initialParams);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      // Serialize filters array as JSON string for GET request
      const serializedParams = { ...params };
      if (params.filters && Array.isArray(params.filters) && params.filters.length > 0) {
        serializedParams.filters = JSON.stringify(params.filters) as any;
      } else {
        delete serializedParams.filters;
      }
      
      const response = await queryFn(serializedParams);
      
      const responseData = Array.isArray(response.data) ? response.data : [];
      setData(responseData);
      setPagination(response.pagination || null);
    } catch (err) {
      console.error('API Query Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [queryFn, params, enabled]);

  const updateParams = useCallback((newParams: Partial<PaginationParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useDeepCompareEffect(() => {
    fetchData();
  }, [fetchData, params]);

  return {
    data,
    pagination,
    loading,
    error,
    refetch,
    updateParams,
  };
};
