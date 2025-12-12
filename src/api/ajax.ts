import { API_CONFIG } from './config';

interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

const ajaxXHR = {
  request: <T>(
    method: string,
    url: string,
    data: unknown = null,
    options: RequestOptions = {}
  ): Promise<T> => {
    const { headers = {}, timeout = API_CONFIG.TIMEOUT } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      // Configurar headers
      xhr.setRequestHeader('Content-Type', 'application/json');
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      // Configurar timeout
      xhr.timeout = timeout;

      // Handler de éxito
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response as T);
          } catch {
            // Si no es JSON, devolver como texto
            resolve(xhr.responseText as T);
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
          });
        }
      };

      // Handler de error de red
      xhr.onerror = () =>
        reject({
          status: 0,
          statusText: 'Network Error',
          response: 'Error de conexión de red',
        });

      // Handler de timeout
      xhr.ontimeout = () =>
        reject({
          status: 408,
          statusText: 'Request Timeout',
          response: 'La petición excedió el tiempo de espera',
        });

      // Enviar petición
      xhr.send(data ? JSON.stringify(data) : null);
    });
  },

  get: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return ajaxXHR.request<T>('GET', url, null, options);
  },

  post: <T>(url: string, data: unknown, options?: RequestOptions): Promise<T> => {
    return ajaxXHR.request<T>('POST', url, data, options);
  },

  put: <T>(url: string, data: unknown, options?: RequestOptions): Promise<T> => {
    return ajaxXHR.request<T>('PUT', url, data, options);
  },

  delete: <T>(url: string, options?: RequestOptions): Promise<T> => {
    return ajaxXHR.request<T>('DELETE', url, null, options);
  },
};

export const ajax = ajaxXHR;
