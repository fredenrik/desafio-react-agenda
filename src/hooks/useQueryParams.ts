import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = useCallback(
    (key: string, defaultValue: string = ''): string => {
      return searchParams.get(key) || defaultValue;
    },
    [searchParams]
  );

  const getNumberParam = useCallback(
    (key: string, defaultValue: number): number => {
      const value = searchParams.get(key);
      const parsed = parseInt(value || '', 10);
      return isNaN(parsed) ? defaultValue : Math.max(1, parsed);
    },
    [searchParams]
  );

  const setParams = useCallback(
    (params: Record<string, string | number>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === '' || value === undefined || value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return { getParam, getNumberParam, setParams };
};
