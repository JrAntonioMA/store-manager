import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";

function Header({ onMenuClick, usuario }) {
    const location = useLocation();
    const userImage = usuario?.image;
    const fallbackLetter = usuario?.firstName?.charAt(0) || "U";

    const obtenerTituloPagina = () => {
        switch (location.pathname) {
            case "/":
                return "Inicio";
            case "/productos":
                return "Productos";
            case "/usuarios":
                return "Usuarios";
            default:
                return "Gestor de Tienda";
        }
    };

    const tituloPagina = obtenerTituloPagina();

    return (
        <Box
            sx={{
                height: 64,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                position: "sticky",
                top: 0,
                zIndex: 1100,
                borderBottom: "1px solid #e0e4e8",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                    onClick={onMenuClick}
                    sx={{
                        display: { xs: "inline-flex", sm: "none" },
                        color: "#0f1f38",
                        p: 0.5,
                        "&:hover": { backgroundColor: "#f0f2f5" },
                    }}
                >
                    ☰
                </IconButton>
                <Typography
                    variant="h6"
                    component="h1"
                    sx={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#0f1f38",
                    }}
                >
                    {tituloPagina}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                    }}
                >
                    Hola, {usuario?.firstName || "Usuario"}
                </Typography>
                <Avatar
                    src={userImage}
                    alt={usuario?.firstName || "Usuario"}
                    sx={{
                        bgcolor: userImage ? "transparent" : "#f55449",
                        width: 36,
                        height: 36,
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                    imgProps={{ onError: (e) => { e.target.style.display = 'none'; } }}
                >
                    {!userImage && fallbackLetter}
                </Avatar>
            </Box>
        </Box>
    );
}

export default Header;