import { api } from "./axios";

export const iniciarSesionRequest = async (datos) => {
    const respuesta = await api.post("/auth/login", datos);
    return respuesta.data;
};

export const obtenerUsuario = async () => {
    const respuesta = await api.get("/auth/me");
    return respuesta.data;
};