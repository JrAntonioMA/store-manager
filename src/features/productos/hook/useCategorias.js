import { useQuery } from "@tanstack/react-query";
import { obtenerCategorias } from "../../../api/productos";

export const usarCategorias = () => {
    return useQuery({
        queryKey: ["categorias"],
        queryFn: obtenerCategorias,
    });
};