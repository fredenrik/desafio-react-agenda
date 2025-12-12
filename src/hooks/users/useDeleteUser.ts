import { useState } from 'react';
import { usersApi } from '../../api';
import type { ApiError } from '../../api';

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await usersApi.deleteUser(id);
      return { success: true, id };
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      return { success: false, error: apiError };
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
