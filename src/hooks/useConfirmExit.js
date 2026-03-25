import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export const usarConfirmarSalida = (cuando) => {
    const bloqueador = useBlocker(
        ({ ubicacionActual, siguienteUbicacion }) =>
            cuando && ubicacionActual.pathname !== siguienteUbicacion.pathname
    );

    useEffect(() => {
        if (bloqueador.state === "blocked") {
            const confirmar = window.confirm(
                "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?"
            );
            if (confirmar) {
                bloqueador.proceed();
            } else {
                bloqueador.reset();
            }
        }
    }, [bloqueador]);

    useEffect(() => {
        const manejarBeforeUnload = (e) => {
            if (cuando) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", manejarBeforeUnload);
        return () => window.removeEventListener("beforeunload", manejarBeforeUnload);
    }, [cuando]);
};