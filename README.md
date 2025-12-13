# Agenda Previred - Mi Agenda de Contactos Laboral

Aplicación web para gestionar contactos laborales con funcionalidades de búsqueda, paginación, creación y eliminación de usuarios.

## 🛠️ Tecnologías

### Core

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool y dev server

### Data & API

- **XMLHttpRequest (AJAX)** - Peticiones HTTP
- **json-server** - Mock API REST

### Setup

```bash
# Instalar dependencias
npm install
```

## 🚦 Comandos Disponibles

```bash
# Desarrollo - Corre cliente (3000) y servidor (9000) simultáneamente
npm run dev

# Solo servidor json-server (puerto 9000)
npm run server

# Solo cliente React (puerto 3000)
npm run client

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Formatear código
npm run format
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Capa de API
│   ├── ajax.ts            # Cliente AJAX con XMLHttpRequest
│   ├── users.api.ts       # Endpoints de usuarios
│   ├── config.ts          # Configuración API
│   └── errorHandler.ts    # Manejo de errores
│
├── components/            # Componentes React
│   ├── common/           # Componentes reutilizables
│   │   └── SearchBar/    # Barra de búsqueda
│   └── users/            # Componentes de usuarios
│       ├── UserDrawer/   # Drawer para crear usuario
│       ├── UserForm/     # Formulario de usuario
│       └── UserList/     # Lista de usuarios
│           ├── UserList.tsx
│           ├── UserListHeader.tsx
│           ├── UserListItem.tsx (desktop)
│           └── UserCard.tsx (mobile)
│
├── context/               # Context API providers
│   └── ResponsiveContext.tsx  # Estado responsive global
│
├── hooks/                 # Custom hooks
│   ├── users/            # Hooks específicos de usuarios
│   │   ├── useUsersPagination.ts
│   │   ├── useCreateUser.ts
│   │   └── useDeleteUser.ts
│   ├── usePagination.ts  # Hook de paginación
│   ├── useSearch.ts      # Hook de búsqueda con debounce
│   ├── useMediaQuery.ts  # Hook para media queries
│   └── useQueryParams.ts # Hook para query params
│
├── pages/                 # Páginas
│   ├── UsersPage/        # Página principal
│   └── NotFoundPage/     # 404
│
├── routes/                # Configuración de rutas
│   └── AppRoutes.tsx     # Definición de rutas
│
├── utils/                 # Utilidades
│   └── validations.ts    # Reglas de validación
│
├── App.tsx               # Componente raíz
└── main.tsx              # Entry point

server/
├── db.json               # Base de datos JSON
└── server.cjs            # Configuración json-server
```

## 🏗️ Arquitectura y Patrones

### Separación por operaciones

Los hooks de usuarios están separados por operación siguiendo el patrón de React Query/RTK Query:

- `useUsersPagination` - GET lista
- `useCreateUser` - POST
- `useDeleteUser` - DELETE

### Validaciones centralizadas

Las validaciones de formularios están organizadas como esquemas (similar a Yup):

```typescript
USER_VALIDATION.name;
USER_VALIDATION.description;
USER_VALIDATION.photo;
```

### Responsive con Context

Un solo `ResponsiveProvider` provee el estado responsive a toda la app, evitando múltiples listeners de media queries.

### Paginación híbrida

- **Sin búsqueda**: Paginación del servidor
- **Con búsqueda**: Paginación del cliente (json-server no soporta ambas)

### CSS Modules

Estilos con scope local para evitar colisiones de nombres.

## 🔌 API Endpoints

Base URL: `http://localhost:9000/api`

```
GET    /users              # Listar usuarios
GET    /users?_page=1&_limit=10  # Paginación
GET    /users?q=search     # Búsqueda full-text
GET    /users/:id          # Obtener usuario
POST   /users              # Crear usuario
DELETE /users/:id          # Eliminar usuario
```

## 📱 Diseño Responsive

### Desktop (> 768px)

- Layout horizontal tipo tabla
- Cabecera con columnas: Nombre (8), Descripción (12), Acciones (4)
- Drawer lateral (520px)

### Mobile (≤ 768px)

- Layout vertical en tarjetas (Card)
- Sin cabecera de tabla
- Drawer desde abajo (85vh)

## 🎯 Decisiones Técnicas

### ¿Por qué monorepo?

Se optó por una estructura de monorepo manteniendo el servidor json-server y el cliente React en el mismo proyecto para:

- **Simplicidad**: Un solo `npm install` y `npm run dev` para levantar todo
- **Desarrollo rápido**: No requiere configurar CORS ni múltiples puertos manualmente


### ¿Por qué XMLHttpRequest en lugar de Fetch?

El test técnico específicamente requiere el uso de AJAX, por lo que se implementó con XMLHttpRequest para cumplir explícitamente este requisito.

### ¿Por qué CSS Modules en lugar de styled-components?

CSS Modules ofrece scope local sin overhead de runtime. Ant Design ya maneja la mayor parte del styling.

## 🤖 Transparencia en el Desarrollo

Este proyecto fue desarrollado con la asistencia de herramientas de IA para:

- **Resolución de problemas técnicos**: Configuración de json-server, proxy de Vite, manejo de CORS
- **Generación de documentación**: creación del README, basado en los comentarios de los componentes y funciones
---
