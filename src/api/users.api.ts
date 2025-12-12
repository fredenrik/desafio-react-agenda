import { ajax } from './ajax';
import { ENDPOINTS, PAGINATION_CONFIG } from './config';
import { handleApiError } from './errorHandler';

export interface User {
  id: number;
  name: string;
  description: string;
  photo: string;
}

export interface CreateUserData {
  name: string;
  description: string;
  photo: string;
}

export interface UsersResponse {
  data: User[];
  page: number;
  limit: number;
  total: number;
}

export const usersApi = {

  getUsers: async (
    page: number = PAGINATION_CONFIG.DEFAULT_PAGE,
    limit: number = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
    query: string = ''
  ): Promise<UsersResponse> => {
    try {
      let url = `${ENDPOINTS.USERS}?_page=${page}&_limit=${limit}`;

      if (query.trim()) {
        url += `&q=${encodeURIComponent(query)}`;
      }

      const data = await ajax.get<User[]>(url);

      return {
        data,
        page,
        limit,
        total: data.length,
      };
    } catch (error) {
      throw handleApiError(error, 'Error al cargar los contactos');
    }
  },

  getUserById: async (id: number): Promise<User> => {
    try {
      const url = `${ENDPOINTS.USERS}/${id}`;
      const data = await ajax.get<User>(url);
      return data;
    } catch (error) {
      throw handleApiError(error, 'Error al cargar el contacto');
    }
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    try {
      const data = await ajax.post<User>(ENDPOINTS.USERS, {
        name: userData.name,
        description: userData.description,
        photo: userData.photo,
      });
      return data;
    } catch (error) {
      throw handleApiError(error, 'Error al crear el contacto');
    }
  },

  deleteUser: async (id: number): Promise<{ success: boolean; id: number }> => {
    try {
      const url = `${ENDPOINTS.USERS}/${id}`;
      await ajax.delete(url);
      return { success: true, id };
    } catch (error) {
      throw handleApiError(error, 'Error al eliminar el contacto');
    }
  },
};
