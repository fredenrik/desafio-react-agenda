import { useState, useCallback } from 'react';
import { usersApi, type User } from '../../api';
import type { ApiError } from '../../api';

export const useUsersPagination = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

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
