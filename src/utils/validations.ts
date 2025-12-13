import type { Rule } from 'antd/es/form';

export const COMMON_RULES = {
  required: (message: string): Rule => ({
    required: true,
    message,
  }),

  minLength: (min: number, message: string): Rule => ({
    min,
    message,
  }),

  maxLength: (max: number, message: string): Rule => ({
    max,
    message,
  }),

  pattern: (pattern: RegExp, message: string): Rule => ({
    pattern,
    message,
  }),

  url: (message: string = 'Por favor ingrese una URL válida'): Rule => ({
    type: 'url',
    message,
  }),

  email: (message: string = 'Por favor ingrese un email válido'): Rule => ({
    type: 'email',
    message,
  }),
};

export const USER_VALIDATION = {
  name: [
    COMMON_RULES.required('Por favor ingrese el nombre'),
    COMMON_RULES.minLength(2, 'El nombre debe tener al menos 2 caracteres'),
    COMMON_RULES.maxLength(50, 'El nombre no puede exceder 50 caracteres'),
  ],

  description: [
    COMMON_RULES.required('Por favor ingrese la descripción'),
    COMMON_RULES.minLength(10, 'La descripción debe tener al menos 10 caracteres'),
    COMMON_RULES.maxLength(500, 'La descripción no puede exceder 500 caracteres'),
  ],

  photo: [
    COMMON_RULES.required('Por favor ingrese la URL de la foto'),
    COMMON_RULES.url('Por favor ingrese una URL válida'),
  ],
};
