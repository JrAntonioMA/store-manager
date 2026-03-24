import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const iniciarSesion = useAuthStore((state) => state.iniciarSesion);

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!usuario.trim() || !contrasena.trim()) {
            setError("Por favor, completa todos los campos");
            return;
        }

        setCargando(true);
        try {
            await iniciarSesion({
                username: usuario,
                password: contrasena,
            });
        } catch (err) {
            setError("Error al iniciar sesión, verifica tus credenciales");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            setError("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);

    const manejarOlvideContrasena = () => {
        console.log("Recuperar contraseña");
    };

    const manejarCrearCuenta = () => {
        console.log("Crear cuenta");
    };

    return {
        usuario,
        contrasena,
        error,
        cargando,
        setUsuario,
        setContrasena,
        manejarLogin,
        manejarOlvideContrasena,
        manejarCrearCuenta,
    };
};