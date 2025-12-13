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
      let url;
      let allData: User[];
      let total: number;

      if (query.trim()) {
        // Con búsqueda: obtener todos los resultados y paginar en cliente
        url = `${ENDPOINTS.USERS}?q=${encodeURIComponent(query)}`;
        const response = await ajax.getWithHeaders<User[]>(url);
        allData = response.data;
        total = allData.length;
        
        // Paginar manualmente los resultados
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = allData.slice(start, end);

        return {
          data: paginatedData,
          page,
          limit,
          total,
        };
      } else {
        // Sin búsqueda: paginación del servidor
        url = `${ENDPOINTS.USERS}?_page=${page}&_limit=${limit}`;
        const response = await ajax.getWithHeaders<User[]>(url);
        total = parseInt(response.headers['x-total-count'] || '0', 10);

        return {
          data: response.data,
          page,
          limit,
          total,
        };
      }
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
