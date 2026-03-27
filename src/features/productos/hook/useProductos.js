import { useQuery } from "@tanstack/react-query";
import {
    obtenerProductos,
    obtenerProductosPorCategoria,
    obtenerTodosPorCategoria,
} from "../../../api/productos";

export const usarProductos = ({ limite, salto, busqueda, categoria }) => {
    const config = (() => {
        if (busqueda && !categoria) {
            return {
                queryKey: ["productos", "search", { limite, salto, busqueda }],
                queryFn: () => obtenerProductos({ limit: limite, skip: salto, q: busqueda }),
            };
        }
        if (categoria && !busqueda) {
            return {
                queryKey: ["productos", "category", categoria, { limite, salto }],
                queryFn: () => obtenerProductosPorCategoria(categoria, { limit: limite, skip: salto }),
            };
        }
        if (categoria && busqueda) {
            return {
                queryKey: ["productos", "all-category", categoria, busqueda],
                queryFn: () => obtenerTodosPorCategoria(categoria),
            };
        }
        return {
            queryKey: ["productos", "all", { limite, salto }],
            queryFn: () => obtenerProductos({ limit: limite, skip: salto }),
        };
    })();

    return useQuery({
        queryKey: config.queryKey,
        queryFn: config.queryFn,
        keepPreviousData: true,
        enabled: true,
    });
};