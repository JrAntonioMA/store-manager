import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { mostrarNotificacion } from "../../../utils/toast";

export const useLogin = () => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [cargando, setCargando] = useState(false);

    const iniciarSesion = useAuthStore((state) => state.iniciarSesion);
    const navigate = useNavigate();

    const esValido = usuario.trim() !== "" && contrasena.trim() !== "";

    const manejarLogin = async (e) => {
        e.preventDefault();

        if (!esValido) {
            mostrarNotificacion("Por favor, completa todos los campos", "warning");
            return;
        }

        setCargando(true);
        try {
            await iniciarSesion({
                username: usuario,
                password: contrasena,
            });
            mostrarNotificacion("Inicio de sesión exitoso", "success");
            navigate("/");
        } catch (err) {
            mostrarNotificacion("Error al iniciar sesión, verifica tus credenciales", "error");
        } finally {
            setCargando(false);
        }
    };

    const manejarOlvideContrasena = () => {
        mostrarNotificacion("Función en desarrollo", "info");
    };

    const manejarCrearCuenta = () => {
        mostrarNotificacion("Función en desarrollo", "info");
    };

    return {
        usuario,
        contrasena,
        cargando,
        esValido,
        setUsuario,
        setContrasena,
        manejarLogin,
        manejarOlvideContrasena,
        manejarCrearCuenta,
    };
};