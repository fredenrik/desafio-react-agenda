import { createContext, useContext, type ReactNode } from 'react';
import { useMediaQuery } from '../hooks';

interface ResponsiveContextValue {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(undefined);

/**
 * Provider para compartir estado responsive del dispositivo en toda la aplicacion
 *
 * Se justifica la implementación de ResponsiveContext ya que el estado no cambia con frecuencia.
 * Todos los componentes comparten el mismo estado responsive y no se ven afectados por
 * renderizaciones innecesarias.
 *
 * @param props - Props del provider
 * @param props.children - Componentes hijos
 */
export const ResponsiveProvider = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

/**
 * Hook para acceder al contexto responsive
 *
 * @example
 * const { isMobile } = useResponsive();
 *
 * @throws Error si se usa fuera del ResponsiveProvider
 * @returns Objeto con isMobile, isTablet, isDesktop
 */
export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive debe usarse dentro de ResponsiveProvider');
  }
  return context;
};
