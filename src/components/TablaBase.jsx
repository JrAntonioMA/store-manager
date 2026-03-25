import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
} from "@mui/material";

function TablaBase({
    columnas,
    datos,
    renderFila,
    mostrarNumeracion = false,
    pagina = 0,
    filasPorPagina = 10,
}) {
    return (
        <Paper
            sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                        {mostrarNumeracion && (
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    color: "#0f1f38",
                                    borderBottom: "none",
                                }}
                            >
                                #
                            </TableCell>
                        )}
                        {columnas.map((col, idx) => (
                            <TableCell
                                key={idx}
                                sx={{
                                    fontWeight: 600,
                                    color: "#0f1f38",
                                    borderBottom: "none",
                                }}
                            >
                                {col}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datos.map((item, index) => {
                        const numero = pagina * filasPorPagina + index + 1;
                        return (
                            <TableRow
                                key={item.id}
                                hover
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    transition: "background-color 0.2s",
                                }}
                            >
                                {mostrarNumeracion && (
                                    <TableCell
                                        sx={{
                                            color: "#8e7970",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {numero}
                                    </TableCell>
                                )}
                                {renderFila(item, numero)}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {datos.length === 0 && (
                <Box sx={{ textAlign: "center", py: 5 }}>
                    <Typography color="text.secondary">No se encontraron resultados</Typography>
                </Box>
            )}
        </Paper>
    );
}

export default TablaBase;