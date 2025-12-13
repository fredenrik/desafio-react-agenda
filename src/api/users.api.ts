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
  /**
   * Obtiene lista de usuarios con paginación y búsqueda
   *
   * Nota: json-server no soporta paginar y buscar al mismo tiempo,
   * por eso cuando hacemos una búsqueda traemos todo y paginamos en el cliente
   *
   * @param page - Número de página a traer
   * @param limit - Cantidad de usuarios por página
   * @param query - Término de búsqueda
   * @returns Promise con los datos de usuarios y metadata de paginación para obtener
   * el total de registros que existen en la BD
   */
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
        // Si está buscando, traemos todos los resultados
        url = `${ENDPOINTS.USERS}?q=${encodeURIComponent(query)}`;
        const response = await ajax.getWithHeaders<User[]>(url);
        allData = response.data;
        total = allData.length;

        // Cortamos el array para simular paginación
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
        // Sin búsqueda usamos paginación del servidor (más eficiente)
        url = `${ENDPOINTS.USERS}?_page=${page}&_limit=${limit}`;
        const response = await ajax.getWithHeaders<User[]>(url);
        // json-server devuelve el total en el header X-Total-Count
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

  /**
   * Obtiene un usuario específico por su ID
   * @param id - ID del usuario
   * @returns Promise con los datos del usuario
   */
  getUserById: async (id: number): Promise<User> => {
    try {
      const url = `${ENDPOINTS.USERS}/${id}`;
      const data = await ajax.get<User>(url);
      return data;
    } catch (error) {
      throw handleApiError(error, 'Error al cargar el contacto');
    }
  },

  /**
   * Crea un nuevo usuario en el sistema
   * @param userData - Datos del usuario a crear: name, description, photo
   * @returns Promise con el usuario creado
   */
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

  /**
   * Elimina un usuario del sistema
   * @param id - ID del usuario a eliminar
   * @returns Promise con confirmación de eliminación
   */
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
