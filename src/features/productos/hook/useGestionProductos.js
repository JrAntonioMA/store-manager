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
    const ordenarPor = parametrosBusqueda.get("sort") || "";
    const direccionOrden = parametrosBusqueda.get("order") || "asc";
    const limite = 10;

    const [textoBusqueda, setTextoBusqueda] = useState(busquedaUrl);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaUrl);

    const [busquedaConDemora, setBusquedaConDemora] = useState(textoBusqueda);
    useEffect(() => {
        const temporizador = setTimeout(() => setBusquedaConDemora(textoBusqueda), 300);
        return () => clearTimeout(temporizador);
    }, [textoBusqueda]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (busquedaConDemora) params.set("q", busquedaConDemora);
        if (categoriaSeleccionada) params.set("category", categoriaSeleccionada);
        if (paginaUrl > 1) params.set("page", paginaUrl);
        if (ordenarPor) {
            params.set("sort", ordenarPor);
            params.set("order", direccionOrden);
        }
        setParametrosBusqueda(params);
    }, [busquedaConDemora, categoriaSeleccionada, paginaUrl, ordenarPor, direccionOrden, setParametrosBusqueda]);

    const salto = (paginaUrl - 1) * limite;

    const { data: productosData, isLoading: productosCargando, isError: productosError } = usarProductos({
        limite,
        salto,
        busqueda: busquedaConDemora,
    });
    const { data: categorias, isLoading: categoriasCargando } = usarCategorias();
    const { eliminar } = usarMutacionesProducto();

    const productosOrdenados = useMemo(() => {
        if (!productosData?.products) return [];
        let productos = [...productosData.products];
        if (ordenarPor) {
            productos.sort((a, b) => {
                let aVal = a[ordenarPor];
                let bVal = b[ordenarPor];
                if (ordenarPor === "price") {
                    aVal = a.price;
                    bVal = b.price;
                } else if (ordenarPor === "rating") {
                    aVal = a.rating;
                    bVal = b.rating;
                }
                if (direccionOrden === "asc") return aVal - bVal;
                else return bVal - aVal;
            });
        }
        return productos;
    }, [productosData?.products, ordenarPor, direccionOrden]);

    const productosFiltrados = useMemo(() => {
        if (!productosOrdenados.length) return [];
        if (categoriaSeleccionada) {
            return productosOrdenados.filter((p) => p.category === categoriaSeleccionada);
        }
        return productosOrdenados;
    }, [productosOrdenados, categoriaSeleccionada]);

    const manejarOrden = (campo) => {
        const nuevaDireccion = ordenarPor === campo && direccionOrden === "asc" ? "desc" : "asc";
        const params = new URLSearchParams(parametrosBusqueda);
        params.set("sort", campo);
        params.set("order", nuevaDireccion);
        setParametrosBusqueda(params);
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
        limite,
        ordenarPor,
        direccionOrden,
        modalAbierto,
        productoEditar,
        confirmacionAbierta,
        productoAEliminar,
        manejarOrden,
        manejarNuevo,
        manejarEditar,
        manejarClickEliminar,
        manejarConfirmarEliminar,
        manejarCancelarEliminar,
        manejarCerrarModal,
        manejarCambiarPagina,
    };
};