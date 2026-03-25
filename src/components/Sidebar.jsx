import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

    const manejarLogout = () => {
        cerrarSesion();
        window.location.href = "/login";
    };

    const menuItems = [
        { text: "Inicio", path: "/" },
        { text: "Productos", path: "/productos" },
        { text: "Usuarios", path: "/usuarios" },
    ];

    return (
        <Box
            sx={{
                height: "100%",
                background: `linear-gradient(135deg, #0f1f38 0%, #1b4b5a 100%)`,
                color: "white",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Logo */}
            <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <Typography variant="h6" fontWeight={600}>
                    Gestor de Tienda
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Panel de administración
                </Typography>
            </Box>

            {/* Menú */}
            <List sx={{ flexGrow: 1, pt: 2 }}>
                {menuItems.map((item) => {
                    const seleccionado = location.pathname === item.path;

                    return (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={seleccionado}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    py: 1.5,
                                    "&.Mui-selected": {
                                        backgroundColor: "#f5544920",
                                        borderRight: `3px solid #f55449`,
                                        "&:hover": { backgroundColor: "#f5544930" },
                                    },
                                    "&:hover": { backgroundColor: "#ffffff10" },
                                    color: "white",
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "0.95rem",
                                        fontWeight: seleccionado ? 600 : 400,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

            {/* Cerrar sesión */}
            <Box sx={{ p: 2 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={manejarLogout}
                    sx={{
                        color: "white",
                        borderColor: "rgba(255,255,255,0.3)",
                        "&:hover": {
                            borderColor: "#f55449",
                            backgroundColor: "#f5544910",
                        },
                        textTransform: "none",
                        py: 1,
                    }}
                >
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;