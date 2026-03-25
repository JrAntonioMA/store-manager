import { api } from "./axios";

export const obtenerUsuarios = async ({ limit = 10, skip = 0 }) => {
    const respuesta = await api.get(`/users?limit=${limit}&skip=${skip}`);
    return respuesta.data;
};

export const obtenerCarritosUsuario = async (idUsuario) => {
    const respuesta = await api.get(`/users/${idUsuario}/carts`);
    return respuesta.data;
};