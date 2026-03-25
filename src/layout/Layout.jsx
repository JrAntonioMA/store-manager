import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const anchoDrawer = 260;

function Diseño() {
    const [movilAbierto, setMovilAbierto] = useState(false);

    const usuario = useAuthStore((state) => state.usuario);
    const cerrarSesion = useAuthStore((state) => state.cerrarSesion);

    const manejarAlternarDrawer = () => {
        setMovilAbierto(!movilAbierto);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fc" }}>

            <Box component="nav" sx={{ width: { sm: anchoDrawer }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={movilAbierto}
                    onClose={manejarAlternarDrawer}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": { width: anchoDrawer },
                    }}
                >
                    <Sidebar />
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": { width: anchoDrawer },
                    }}
                    open
                >
                    <Sidebar />
                </Drawer>
            </Box>

            <Box sx={{ flexGrow: 1 }}>

                <Header
                    onMenuClick={manejarAlternarDrawer}
                    usuario={usuario}
                />

                <Box
                    component="main"
                    sx={{
                        p: 3,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default Diseño;