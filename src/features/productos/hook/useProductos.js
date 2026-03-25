import { useQuery } from "@tanstack/react-query";
import { obtenerProductos } from "../../../api/productos";

export const usarProductos = ({ limite, salto, busqueda }) => {
    return useQuery({
        queryKey: ["productos", { limite, salto, busqueda }],
        queryFn: () => obtenerProductos({ limit: limite, skip: salto, q: busqueda }),
        keepPreviousData: true,
    });
};