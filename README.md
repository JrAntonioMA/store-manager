# StoreManager – Panel de administración

> Prueba técnica para **Ecolana**

# Descripción

Panel de administración para productos y usuarios desarrollado como prueba técnica para Ecolana. Consume la API pública DummyJSON e implementa autenticación JWT, gestión de productos con búsqueda, filtros, paginación, ordenamiento y un formulario complejo con variantes, además de una sección de usuarios con visualización de carritos

# Tecnologías utilizadas
- React 19 (versión reciente)
- React Router 7 (versión reciente)
- React Query 5
- Zustand
- React Hook Form + Zod
- Axios
- React Bootstrap (se migró desde MUI por tiempo y facilidad para responsive)
- notistack
- Vite

Se utilizó JavaScript en lugar de TypeScript por limitaciones de tiempo

# Estructura del proyecto

-src
    |   App.jsx
    |   index.css
    |   main.jsx
    |
    +---api
    |       auth.js
    |       axios.js
    |       productos.js
    |       usuarios.js
    |
    +---assets
    |       hero.png
    |       react.svg
    |       vite.svg
    |
    +---components
    |       ConfirmDialog.jsx
    |       Header.jsx
    |       PaginacionTabla.jsx
    |       Sidebar.jsx
    |       TablaBase.jsx
    |
    +---features
    |   +---auth
    |   |   +---hook
    |   |   |       useLogin.js
    |   |   |
    |   |   \---pages
    |   |           Login.jsx
    |   |
    |   +---productos
    |   |   +---components
    |   |   |       ProductoForm.jsx
    |   |   |       ProductoModal.jsx
    |   |   |
    |   |   +---hook
    |   |   |       useCategorias.js
    |   |   |       useFormularioProducto.js
    |   |   |       useGestionProductos.js
    |   |   |       useMutateProducto.js
    |   |   |       useProducto.js
    |   |   |       useProductos.js
    |   |   |
    |   |   \---pages
    |   |           Productos.jsx
    |   |
    |   \---usuarios
    |       +---components
    |       |       DrawerCarritos.jsx
    |       |
    |       +---hook
    |       |       useCarritosUsuario.js
    |       |       useGestionUsuarios.js
    |       |       useUsuarios.js
    |       |
    |       \---pages
    |               Usuarios.jsx
    |
    +---layout
    |       Layout.jsx
    |
    +---routes
    |       AppRouter.jsx
    |       PrivateRoute.jsx
    |
    +---store
    |       authStore.js
    |
    \---utils
            toast.js
            validations.js

# Instalación y ejecución
> npm install
> npm run dev

# Funcionalidades principales
> Autenticación
    - Login con validación
    - Almacenamiento de JWT y refreshToken 
    - Renovación silenciosa con interceptores de Axios
    - Protección de rutas

> Catálogo de productos
    - Tabla paginada
    - Búsqueda con debounce
    - Filtro por categoría
    - Ordenamiento por precio, stock y rating 
    - Sincronización de estado con la URL

> Formulario de producto
    - Creación y edición
    - Variantes dinámicas
    - Validaciones cruzadas
    - Borrador automático
    - Confirmación de salida

> Usuarios y carritos
    - Tabla paginada
    - Búsqueda local
    - Drawer con carritos del usuario
    - Cálculo de totales

# Decisiones técnicas

> React Query para cacheo y sincronización con el servidor
> Zustand para el estado de sesión
> React Hook Form + Zod para manejo eficiente de formularios complejos
> Axios con interceptores para manejo centralizado de autenticación
> Arquitectura basada en features para escalabilidad y mantenibilidad
> URL como fuente de verdad para filtros y paginación

# Faltante

> Combinación búsqueda + categoría
> Tenología recomendada
