import { create } from "zustand";
import { iniciarSesionRequest } from "../api/auth";

export const useAuthStore = create((set) => ({
    usuario: JSON.parse(localStorage.getItem("usuario")) || null,
    token: localStorage.getItem("token") || null,

    iniciarSesion: async (credenciales) => {
        const data = await iniciarSesionRequest(credenciales);

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("usuario", JSON.stringify(data));

        set({
            usuario: data,
            token: data.accessToken,
        });
    },

    cerrarSesion: () => {
        localStorage.clear();
        set({ usuario: null, token: null });
    },
}));