import { useState, useCallback } from 'react';
import { usersApi, type User } from '../../api';
import type { ApiError } from '../../api';

/**
 * Hook para manejar la lista de usuarios con estado de carga y errores
 *
 * Encapsula la lógica de traer usuarios de la API y manejar los estados
 * de loading y error asociados
 *
 * @returns Objeto con users, loading, error, fetchUsers y reset
 */
export const useUsersPagination = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  /**
   * Trae usuarios de la API y actualiza el estado
   *
   * @param page - Número de página
   * @param pageSize - Cantidad de usuarios por página
   * @param query - Término de búsqueda (opcional)
   * @returns Respuesta completa de la API (incluye total para paginación) o null si hay error
   */
  const fetchUsers = useCallback(async (page: number, pageSize: number, query: string = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await usersApi.getUsers(page, pageSize, query);
      setUsers(response.data);
      return response;
    } catch (err) {
      setError(err as ApiError);
      setUsers([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = () => {
    setUsers([]);
    setError(null);
  };

  return { users, loading, error, fetchUsers, reset };
};
