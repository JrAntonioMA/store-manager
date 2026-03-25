import { useQuery, useQueries } from "@tanstack/react-query";
import { obtenerCarritosUsuario } from "../../../api/usuarios";

export const useCarritosUsuario = (usuarioId, abierto) => {
    return useQuery({
        queryKey: ["carritos", usuarioId],
        queryFn: () => obtenerCarritosUsuario(usuarioId),
        enabled: !!usuarioId && abierto,
    });
};

export const useConteoCarritos = (idsUsuarios) => {
    const queries = useQueries({
        queries: idsUsuarios.map((idUsuario) => ({
            queryKey: ["carritos", idUsuario],
            queryFn: () => obtenerCarritosUsuario(idUsuario),
            enabled: !!idUsuario,
        })),
    });

    const conteos = queries.map((consulta) => {
        if (consulta.isLoading) return null;
        if (consulta.isError) return "?";
        return consulta.data?.carts?.length ?? 0;
    });

    const cargando = queries.some((q) => q.isLoading);
    return { conteos, cargando };
};