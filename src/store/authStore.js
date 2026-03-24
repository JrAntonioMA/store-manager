import { create } from "zustand";
import { iniciarSesionRequest } from "../api/auth";

export const useAuthStore = create((set) => ({
    usuario: null,
    token: localStorage.getItem("token") || null,

    iniciarSesion: async (credenciales) => {
        const data = await iniciarSesionRequest(credenciales);

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

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