import { useState } from 'react';
import { usersApi, type CreateUserData } from '../../api';
import type { ApiError } from '../../api';

/**
 * Hook para crear nuevos usuarios
 *
 * @returns Objeto con createUser, loading y error
 */
export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createUser = async (userData: CreateUserData) => {
    setLoading(true);
    setError(null);

    try {
      const newUser = await usersApi.createUser(userData);
      return { success: true, data: newUser };
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      return { success: false, error: apiError };
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
