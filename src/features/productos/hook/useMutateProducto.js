import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearProducto, actualizarProducto, eliminarProducto } from "../../../api/productos";
import { mostrarNotificacion } from "../../../utils/toast";

export const usarMutacionesProducto = () => {
    const clienteQuery = useQueryClient();

    const crear = useMutation({
        mutationFn: crearProducto,
        onSuccess: () => {
            clienteQuery.invalidateQueries(["productos"]);
            mostrarNotificacion("Producto creado exitosamente", "success");
        },
        onError: () => {
            mostrarNotificacion("Error al crear producto", "error");
        },
    });

    const actualizar = useMutation({
        mutationFn: actualizarProducto,
        onSuccess: () => {
            clienteQuery.invalidateQueries(["productos"]);
            mostrarNotificacion("Producto actualizado exitosamente", "success");
        },
        onError: () => {
            mostrarNotificacion("Error al actualizar producto", "error");
        },
    });

    const eliminar = useMutation({
        mutationFn: eliminarProducto,
        onSuccess: () => {
            clienteQuery.invalidateQueries(["productos"]);
            mostrarNotificacion("Producto eliminado exitosamente", "success");
        },
        onError: () => {
            mostrarNotificacion("Error al eliminar producto", "error");
        },
    });

    return { crear, actualizar, eliminar };
};