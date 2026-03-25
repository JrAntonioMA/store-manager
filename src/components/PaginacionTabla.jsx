import { TablePagination, Box, Typography, IconButton } from "@mui/material";
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material";

function PaginacionTabla({
    total,
    pagina,
    filasPorPagina,
    onChangePagina,
    onChangeFilas,
}) {
    const totalPaginas = Math.ceil(total / filasPorPagina);
    const paginaActual = pagina + 1;

    const manejarCambioPagina = (nuevaPagina) => {
        onChangePagina(nuevaPagina - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mt: 3,
                px: 2,
                py: 1,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Filas por página:
                </Typography>
                <select
                    value={filasPorPagina}
                    onChange={(e) => {
                        onChangeFilas(parseInt(e.target.value, 10));
                        onChangePagina(0);
                    }}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid #e0e4e8",
                        backgroundColor: "white",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                    onClick={() => manejarCambioPagina(1)}
                    disabled={paginaActual === 1}
                    sx={{
                        color: "#0f1f38",
                        "&.Mui-disabled": { color: "#e0e4e8" },
                    }}
                >
                    <FirstPage />
                </IconButton>
                <IconButton
                    onClick={() => manejarCambioPagina(paginaActual - 1)}
                    disabled={paginaActual === 1}
                    sx={{
                        color: "#0f1f38",
                        "&.Mui-disabled": { color: "#e0e4e8" },
                    }}
                >
                    <NavigateBefore />
                </IconButton>

                <Typography variant="body2" sx={{ mx: 1 }}>
                    Página {paginaActual} de {totalPaginas}
                </Typography>

                <IconButton
                    onClick={() => manejarCambioPagina(paginaActual + 1)}
                    disabled={paginaActual === totalPaginas}
                    sx={{
                        color: "#0f1f38",
                        "&.Mui-disabled": { color: "#e0e4e8" },
                    }}
                >
                    <NavigateNext />
                </IconButton>
                <IconButton
                    onClick={() => manejarCambioPagina(totalPaginas)}
                    disabled={paginaActual === totalPaginas}
                    sx={{
                        color: "#0f1f38",
                        "&.Mui-disabled": { color: "#e0e4e8" },
                    }}
                >
                    <LastPage />
                </IconButton>
            </Box>

            <Typography variant="body2" color="text.secondary">
                Mostrando {Math.min(filasPorPagina, total - pagina * filasPorPagina)} de {total} registros
            </Typography>
        </Box>
    );
}

export default PaginacionTabla;