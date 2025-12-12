import { useState, useCallback } from 'react';
import { PAGINATION_CONFIG } from '../api';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

interface UsePaginationResult {
  pagination: PaginationState;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPageSize: (size: number) => void;
  setTotal: (total: number) => void;
  reset: () => void;
}

export const usePagination = (
  initialPage: number = PAGINATION_CONFIG.DEFAULT_PAGE,
  initialPageSize: number = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE
): UsePaginationResult => {
  const [pagination, setPagination] = useState<PaginationState>({
    current: initialPage,
    pageSize: initialPageSize,
    total: 0,
  });

  const goToPage = useCallback((page: number) => {
    setPagination(prev => ({
      ...prev,
      current: Math.max(1, page),
    }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination(prev => {
      const maxPage = Math.ceil(prev.total / prev.pageSize);
      return {
        ...prev,
        current: Math.min(prev.current + 1, maxPage || 1),
      };
    });
  }, []);

  const prevPage = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      current: Math.max(prev.current - 1, 1),
    }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize: size,
      current: 1, // Reset a primera página al cambiar tamaño
    }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setPagination(prev => ({
      ...prev,
      total,
    }));
  }, []);

  const reset = useCallback(() => {
    setPagination({
      current: initialPage,
      pageSize: initialPageSize,
      total: 0,
    });
  }, [initialPage, initialPageSize]);

  return {
    pagination,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    setTotal,
    reset,
  };
};
