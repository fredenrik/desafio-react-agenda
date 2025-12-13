import type { Rule } from 'antd/es/form';

/**
 * Factory de reglas de validación reutilizables para formularios
 *
 * Estilo basado en la esquematización que realiza Yup.
 */
export const COMMON_RULES = {
  /**
   * Regla para campo obligatorio
   * @param message - Mensaje de error a mostrar
   * @returns Regla de validación de Ant Design
   */
  required: (message: string): Rule => ({
    required: true,
    message,
  }),

  /**
   * Regla para longitud mínima de texto
   * @param min - Cantidad mínima de caracteres
   * @param message - Mensaje de error a mostrar
   * @returns Regla de validación de Ant Design
   */
  minLength: (min: number, message: string): Rule => ({
    min,
    message,
  }),

  /**
   * Regla para longitud máxima de texto
   * @param max - Cantidad máxima de caracteres
   * @param message - Mensaje de error a mostrar
   * @returns Regla de validación de Ant Design
   */
  maxLength: (max: number, message: string): Rule => ({
    max,
    message,
  }),

  /**
   * Regla para validar patrón con expresión regular
   * @param pattern - Expresión regular a validar
   * @param message - Mensaje de error a mostrar
   * @returns Regla de validación de Ant Design
   */
  pattern: (pattern: RegExp, message: string): Rule => ({
    pattern,
    message,
  }),

  /**
   * Regla para validar formato de URL
   * @param message - Mensaje de error personalizado (opcional)
   * @returns Regla de validación de Ant Design
   */
  url: (message: string = 'Por favor ingrese una URL válida'): Rule => ({
    type: 'url',
    message,
  }),

  /**
   * Regla para validar formato de email
   * @param message - Mensaje de error personalizado (opcional)
   * @returns Regla de validación de Ant Design
   */
  email: (message: string = 'Por favor ingrese un email válido'): Rule => ({
    type: 'email',
    message,
  }),
};

/**
 * Esquema de validación para el formulario de usuarios
 *
 * Agrupa las reglas por campo para mantener la consistencia
 * y facilitar el mantenimiento.
 *
 */
export const USER_VALIDATION = {
  /** Validaciones para el campo nombre (2-50 caracteres) */
  name: [
    COMMON_RULES.required('Por favor ingrese el nombre'),
    COMMON_RULES.minLength(2, 'El nombre debe tener al menos 2 caracteres'),
    COMMON_RULES.maxLength(50, 'El nombre no puede exceder 50 caracteres'),
  ],

  /** Validaciones para el campo descripción (10-500 caracteres) */
  description: [
    COMMON_RULES.required('Por favor ingrese la descripción'),
    COMMON_RULES.minLength(10, 'La descripción debe tener al menos 10 caracteres'),
    COMMON_RULES.maxLength(500, 'La descripción no puede exceder 500 caracteres'),
  ],

  /** Validaciones para el campo foto (URL válida requerida) */
  photo: [
    COMMON_RULES.required('Por favor ingrese la URL de la foto'),
    COMMON_RULES.url('Por favor ingrese una URL válida'),
  ],
};
