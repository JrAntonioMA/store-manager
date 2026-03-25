import { api } from "./axios";

export const obtenerProductos = async ({ limit = 10, skip = 0, q = "" }) => {
    const url = q
        ? `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
        : `/products?limit=${limit}&skip=${skip}`;
    const { data } = await api.get(url);
    return data;
};

export const obtenerCategorias = async () => {
    const { data } = await api.get("/products/categories");
    return data;
};

export const obtenerProductoPorId = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};

export const crearProducto = async (producto) => {
    const { data } = await api.post("/products/add", producto);
    return data;
};

export const actualizarProducto = async ({ id, ...producto }) => {
    const { data } = await api.put(`/products/${id}`, producto);
    return data;
};

export const eliminarProducto = async (id) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
};