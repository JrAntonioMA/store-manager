import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usarProductos } from "../hook/useProductos";
import { usarCategorias } from "../hook/useCategorias";
import { usarMutacionesProducto } from "../hook/useMutateProducto";

export const useGestionProductos = () => {
    const [parametrosBusqueda, setParametrosBusqueda] = useSearchParams();
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const busquedaUrl = parametrosBusqueda.get("q") || "";
    const categoriaUrl = parametrosBusqueda.get("category") || "";
    const paginaUrl = parseInt(parametrosBusqueda.get("page") || "1");
    const ordenUrl = parametrosBusqueda.get("sort") || "";
    const direccionUrl = parametrosBusqueda.get("order") || "asc";
    const limiteUrl = parseInt(parametrosBusqueda.get("limit") || "10");

    const [textoBusqueda, setTextoBusqueda] = useState(busquedaUrl);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaUrl);
    const [filasPorPagina, setFilasPorPagina] = useState(limiteUrl);
    const [ordenLocal, setOrdenLocal] = useState(ordenUrl);
    const [ordenDireccionLocal, setOrdenDireccionLocal] = useState(direccionUrl);

    const [busquedaConDemora, setBusquedaConDemora] = useState(textoBusqueda);
    useEffect(() => {
        const temporizador = setTimeout(() => setBusquedaConDemora(textoBusqueda), 300);
        return () => clearTimeout(temporizador);
    }, [textoBusqueda]);

    useEffect(() => {
        setTextoBusqueda(busquedaUrl);
        setBusquedaConDemora(busquedaUrl);
        setCategoriaSeleccionada(categoriaUrl);
        setFilasPorPagina(limiteUrl);
        setOrdenLocal(ordenUrl);
        setOrdenDireccionLocal(direccionUrl);
    }, [busquedaUrl, categoriaUrl, limiteUrl, ordenUrl, direccionUrl]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (busquedaConDemora) params.set("q", busquedaConDemora);
        if (categoriaSeleccionada) params.set("category", categoriaSeleccionada);
        if (paginaUrl > 1) params.set("page", paginaUrl);
        if (ordenLocal) {
            params.set("sort", ordenLocal);
            params.set("order", ordenDireccionLocal);
        }
        if (filasPorPagina !== 10) params.set("limit", filasPorPagina);
        setParametrosBusqueda(params);
    }, [busquedaConDemora, categoriaSeleccionada, paginaUrl, ordenLocal, ordenDireccionLocal, filasPorPagina, setParametrosBusqueda]);

    const salto = (paginaUrl - 1) * filasPorPagina;

    const { data: productosData, isLoading: productosCargando, isError: productosError } = usarProductos({
        limite: filasPorPagina,
        salto: salto,
        busqueda: busquedaConDemora,
        categoria: categoriaSeleccionada,
    });
    const { data: categorias, isLoading: categoriasCargando } = usarCategorias();
    const { eliminar } = usarMutacionesProducto();

    const productosOrdenados = useMemo(() => {
        if (!productosData?.products) return [];
        let productos = [...productosData.products];
        if (ordenLocal) {
            productos.sort((a, b) => {
                let aVal = a[ordenLocal];
                let bVal = b[ordenLocal];
                if (ordenLocal === "price") {
                    aVal = parseFloat(a.price);
                    bVal = parseFloat(b.price);
                } else if (ordenLocal === "rating") {
                    aVal = parseFloat(a.rating);
                    bVal = parseFloat(b.rating);
                } else if (ordenLocal === "stock") {
                    aVal = parseInt(a.stock, 10);
                    bVal = parseInt(b.stock, 10);
                }
                if (ordenDireccionLocal === "asc") return aVal - bVal;
                else return bVal - aVal;
            });
        }
        return productos;
    }, [productosData?.products, ordenLocal, ordenDireccionLocal]);

    const productosFiltrados = useMemo(() => {
        if (!productosOrdenados.length) return [];
        if (categoriaSeleccionada) {
            return productosOrdenados.filter((p) => p.category === categoriaSeleccionada);
        }
        return productosOrdenados;
    }, [productosOrdenados, categoriaSeleccionada]);

    const ordenarRatingAsc = () => {
        setOrdenLocal("rating");
        setOrdenDireccionLocal("asc");
    };
    const ordenarRatingDesc = () => {
        setOrdenLocal("rating");
        setOrdenDireccionLocal("desc");
    };
    const ordenarPrecioAsc = () => {
        setOrdenLocal("price");
        setOrdenDireccionLocal("asc");
    };
    const ordenarPrecioDesc = () => {
        setOrdenLocal("price");
        setOrdenDireccionLocal("desc");
    };
    const ordenarStockAsc = () => {
        setOrdenLocal("stock");
        setOrdenDireccionLocal("asc");
    };
    const ordenarStockDesc = () => {
        setOrdenLocal("stock");
        setOrdenDireccionLocal("desc");
    };

    const limpiarFiltros = () => {
        setTextoBusqueda("");
        setCategoriaSeleccionada("");
        setOrdenLocal("");
        setOrdenDireccionLocal("asc");
    };

    const manejarNuevo = () => {
        setProductoEditar(null);
        setModalAbierto(true);
    };
    const manejarEditar = (producto) => {
        setProductoEditar(producto);
        setModalAbierto(true);
    };
    const manejarClickEliminar = (producto) => {
        setProductoAEliminar(producto);
        setConfirmacionAbierta(true);
    };
    const manejarConfirmarEliminar = async () => {
        if (productoAEliminar) {
            await eliminar.mutateAsync(productoAEliminar.id);
            setConfirmacionAbierta(false);
            setProductoAEliminar(null);
        }
    };
    const manejarCancelarEliminar = () => {
        setConfirmacionAbierta(false);
        setProductoAEliminar(null);
    };
    const manejarCerrarModal = () => {
        setModalAbierto(false);
        setProductoEditar(null);
    };
    const manejarCambiarPagina = (nuevaPagina) => {
        const params = new URLSearchParams(parametrosBusqueda);
        if (nuevaPagina + 1 === 1) params.delete("page");
        else params.set("page", nuevaPagina + 1);
        setParametrosBusqueda(params);
    };
    const manejarCambiarFilasPorPagina = (nuevoLimite) => {
        setFilasPorPagina(nuevoLimite);
        const params = new URLSearchParams(parametrosBusqueda);
        params.delete("page");
        if (nuevoLimite !== 10) params.set("limit", nuevoLimite);
        else params.delete("limit");
        setParametrosBusqueda(params);
    };

    return {
        textoBusqueda,
        setTextoBusqueda,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        productosFiltrados,
        categorias,
        cargando: productosCargando || categoriasCargando,
        error: productosError,
        total: productosData?.total || 0,
        pagina: paginaUrl - 1,
        limite: filasPorPagina,
        ordenarPor: ordenLocal,
        direccionOrden: ordenDireccionLocal,
        modalAbierto,
        productoEditar,
        confirmacionAbierta,
        productoAEliminar,
        ordenarRatingAsc,
        ordenarRatingDesc,
        ordenarPrecioAsc,
        ordenarPrecioDesc,
        ordenarStockAsc,
        ordenarStockDesc,
        limpiarFiltros,
        manejarNuevo,
        manejarEditar,
        manejarClickEliminar,
        manejarConfirmarEliminar,
        manejarCancelarEliminar,
        manejarCerrarModal,
        manejarCambiarPagina,
        manejarCambiarFilasPorPagina,
    };
};