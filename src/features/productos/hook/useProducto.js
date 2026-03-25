import { useQuery } from "@tanstack/react-query";
import { obtenerProductoPorId } from "../../../api/productos";

export const usarProducto = (id) => {
    return useQuery({
        queryKey: ["producto", id],
        queryFn: () => obtenerProductoPorId(id),
        enabled: !!id,
    });
};