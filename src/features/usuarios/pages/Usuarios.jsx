import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    TableCell,
    Avatar,
    InputAdornment,
    Chip,
    Skeleton,
    Tooltip,
} from "@mui/material";
import { ShoppingCart, Search } from "@mui/icons-material";
import TablaBase from "../../../components/TablaBase";
import PaginacionTabla from "../../../components/PaginacionTabla";
import DrawerCarritos from "../components/DrawerCarritos";
import { useGestionUsuarios } from "../hook/useGestionUsuarios";

function Usuarios() {
    const {
        busqueda,
        setBusqueda,
        pagina,
        filasPorPagina,
        usuariosConConteos,
        total,
        isLoading,
        isError,
        drawerAbierto,
        usuarioSeleccionado,
        conteosCargando,
        handleAbrirDrawer,
        handleCerrarDrawer,
        handleChangePagina,
        handleChangeFilasPorPagina,
    } = useGestionUsuarios();

    const renderFila = (usuario) => {
        const conteo = usuario.conteoCarritos;
        const cargandoConteo = conteosCargando && conteo === null;
        const imagenUsuario = usuario.image;
        const letraFallback = usuario.firstName?.charAt(0).toUpperCase() || "?";

        return (
            <>
                <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                            src={imagenUsuario}
                            alt={`${usuario.firstName} ${usuario.lastName}`}
                            sx={{
                                bgcolor: imagenUsuario ? "transparent" : "#f55449",
                                width: 32,
                                height: 32,
                                fontSize: "0.875rem",
                            }}
                            imgProps={{ onError: (e) => (e.target.style.display = "none") }}
                        >
                            {!imagenUsuario && letraFallback}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                            {usuario.firstName} {usuario.lastName}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>
                    {cargandoConteo ? (
                        <Skeleton variant="rounded" width={56} height={28} />
                    ) : (
                        <Tooltip title="Ver carritos" arrow>
                            <Chip
                                icon={<ShoppingCart sx={{ fontSize: 16 }} />}
                                label={conteo}
                                onClick={() => handleAbrirDrawer(usuario)}
                                size="small"
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    color: "#0f1f38",
                                    fontWeight: 500,
                                    border: "1px solid #e0e4e8",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: "#f55449",
                                        color: "#fff",
                                        borderColor: "#f55449",
                                        "& .MuiChip-icon": { color: "#fff" },
                                    },
                                    "& .MuiChip-icon": { color: "#f55449", transition: "color 0.2s ease" },
                                }}
                            />
                        </Tooltip>
                    )}
                </TableCell>
            </>
        );
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress sx={{ color: "#f55449" }} />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography color="error">Error al cargar usuarios. Intenta de nuevo.</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por nombre o correo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "#8e7970", fontSize: "1.2rem" }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e4e8" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f55449" },
                        },
                    }}
                />
            </Box>

            <TablaBase
                columnas={["Nombre", "Correo", "Carritos"]}
                datos={usuariosConConteos}
                mostrarNumeracion={true}
                pagina={pagina}
                filasPorPagina={filasPorPagina}
                renderFila={renderFila}
            />

            <PaginacionTabla
                total={total}
                pagina={pagina}
                filasPorPagina={filasPorPagina}
                onChangePagina={handleChangePagina}
                onChangeFilas={handleChangeFilasPorPagina}
            />

            <DrawerCarritos
                abierto={drawerAbierto}
                alCerrar={handleCerrarDrawer}
                usuario={usuarioSeleccionado}
            />
        </Box>
    );
}

export default Usuarios;