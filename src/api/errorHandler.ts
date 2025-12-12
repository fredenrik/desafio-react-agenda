export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

export const handleApiError = (error: unknown, defaultMessage: string): ApiError => {
  // Error de red
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      message: 'Error de conexión. Verifica tu red o que el servidor esté corriendo.',
      status: 0,
      details: error.message,
    };
  }

  // Error HTTP
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const httpError = error as { status: number; statusText?: string; response?: unknown };

    const errorResponse: ApiError = {
      message: defaultMessage,
      status: httpError.status,
      details: httpError.response,
    };

    switch (httpError.status) {
      case 400:
        errorResponse.message = 'Datos inválidos. Verifica la información enviada.';
        break;
      case 404:
        errorResponse.message = 'Recurso no encontrado.';
        break;
      case 500:
        errorResponse.message = 'Error del servidor. Intenta más tarde.';
        break;
      case 503:
        errorResponse.message = 'Servicio no disponible. Intenta más tarde.';
        break;
      default:
        errorResponse.message = defaultMessage;
    }

    return errorResponse;
  }

  // Error desconocido
  return {
    message: defaultMessage,
    status: 500,
    details: error,
  };
};
