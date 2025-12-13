import { useState, useEffect, useCallback } from 'react';

interface UseSearchResult {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

/**
 * Hook para búsqueda con debounce
 *
 * Devuelve dos valores: el término inmediato (searchTerm) y el demorado (debouncedSearchTerm) para evitar
 * hacer requests en cada tecla presionada
 *
 * @param initialValue - Valor inicial del campo de búsqueda
 * @param delay - Tiempo de espera en ms antes de actualizar el valor demorado (default: 500)
 * @returns Objeto con searchTerm, debouncedSearchTerm, setSearchTerm y clearSearch
 */
export const useSearch = (initialValue: string = '', delay: number = 500): UseSearchResult => {
  const [searchTerm, setSearchTermState] = useState<string>(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(initialValue);

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTermState('');
    setDebouncedSearchTerm('');
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    clearSearch,
  };
};
