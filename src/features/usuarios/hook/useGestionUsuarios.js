import { useState } from "react";
import { useUsuarios } from "./useUsuarios";
import { useConteoCarritos } from "./useCarritosUsuario";

export const useGestionUsuarios = () => {
    const [busqueda, setBusqueda] = useState("");
    const [pagina, setPagina] = useState(0);
    const [filasPorPagina, setFilasPorPagina] = useState(10);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [drawerAbierto, setDrawerAbierto] = useState(false);

    const skip = pagina * filasPorPagina;

    const { data, isLoading, isError } = useUsuarios({
        limite: filasPorPagina,
        salto: skip,
    });

    const usuariosFiltrados = (data?.users || []).filter((usuario) => {
        const texto = `${usuario.firstName} ${usuario.lastName} ${usuario.email}`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
    });

    const userIds = usuariosFiltrados.map((u) => u.id);
    const { conteos, cargando: conteosCargando } = useConteoCarritos(userIds);

    const usuariosConConteos = usuariosFiltrados.map((usuario, idx) => ({
        ...usuario,
        conteoCarritos: conteos[idx] ?? 0,
    }));

    const handleAbrirDrawer = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setDrawerAbierto(true);
    };

    const handleCerrarDrawer = () => {
        setDrawerAbierto(false);
        setUsuarioSeleccionado(null);
    };

    const handleChangePagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
    };

    const handleChangeFilasPorPagina = (nuevoLimite) => {
        setFilasPorPagina(nuevoLimite);
        setPagina(0);
    };

    return {
        busqueda,
        setBusqueda,
        pagina,
        filasPorPagina,
        usuariosConConteos,
        total: data?.total || 0,
        isLoading,
        isError,
        drawerAbierto,
        usuarioSeleccionado,
        conteosCargando,
        handleAbrirDrawer,
        handleCerrarDrawer,
        handleChangePagina,
        handleChangeFilasPorPagina,
    };
};