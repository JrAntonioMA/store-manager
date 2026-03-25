import { useQuery } from "@tanstack/react-query";
import { obtenerUsuarios } from "../../../api/usuarios";

export const useUsuarios = ({ limite, salto }) => {
    return useQuery({
        queryKey: ["usuarios", limite, salto],
        queryFn: () => obtenerUsuarios({ limit: limite, skip: salto }),
        keepPreviousData: true,
    });
};