import {
    Drawer,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    CircularProgress,
    Alert,
    Avatar,
    Stack,
    Chip,
    Paper,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCarritosUsuario } from "../hook/useCarritosUsuario";

function DrawerCarritos({ abierto, alCerrar, usuario }) {
    const { data, isLoading, isError, error } = useCarritosUsuario(usuario?.id, abierto);

    const carritos = data?.carts || [];
    const tieneCarritos = carritos.length > 0;

    return (
        <Drawer anchor="right" open={abierto} onClose={alCerrar}>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    bgcolor: "white",
                    zIndex: 1,
                    p: 2,
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={600}>
                        Carritos de {usuario?.firstName} {usuario?.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {usuario?.email}
                    </Typography>
                </Box>
                <IconButton onClick={alCerrar} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>
                {isLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress size={40} sx={{ color: "#f55449" }} />
                    </Box>
                )}

                {isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Error al cargar carritos: {error?.message || "intenta de nuevo"}
                    </Alert>
                )}

                {!isLoading && !isError && !tieneCarritos && (
                    <Typography color="text.secondary" textAlign="center" py={4}>
                        No se encontraron carritos para este usuario.
                    </Typography>
                )}

                {!isLoading && !isError && tieneCarritos && (
                    carritos.map((carrito) => {
                        const totalOriginal = carrito.total;
                        const totalConDescuento = carrito.discountedTotal ?? totalOriginal;
                        const ahorro = totalOriginal - totalConDescuento;

                        return (
                            <Paper
                                key={carrito.id}
                                sx={{
                                    mb: 3,
                                    p: 2,
                                    borderRadius: 3,
                                    bgcolor: "#ffffff",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                    transition: "box-shadow 0.2s",
                                    "&:hover": {
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                                    Carrito #{carrito.id}
                                </Typography>

                                <List dense sx={{ p: 0 }}>
                                    {carrito.products.map((producto) => {
                                        const originalTotal = producto.price * producto.quantity;
                                        const finalTotal = producto.discountedTotal ?? originalTotal;
                                        const tieneDescuento = producto.discountPercentage > 0;

                                        return (
                                            <ListItem
                                                key={producto.id}
                                                sx={{
                                                    px: 0,
                                                    py: 1.5,
                                                    borderBottom: "1px solid #f0f0f0",
                                                    "&:last-child": { borderBottom: 0 },
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Avatar
                                                    src={producto.thumbnail}
                                                    alt={producto.title}
                                                    variant="rounded"
                                                    sx={{ width: 56, height: 56, mr: 2, borderRadius: 2 }}
                                                />

                                                <Box sx={{ flex: 1, mr: 2 }}>
                                                    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                                                        {producto.title}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        alignItems="center"
                                                        flexWrap="wrap"
                                                        useFlexGap
                                                    >
                                                        <Typography variant="caption" color="text.secondary">
                                                            Cantidad: {producto.quantity}
                                                        </Typography>
                                                        {tieneDescuento && (
                                                            <Chip
                                                                label={`-${producto.discountPercentage}%`}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: "#f5544920",
                                                                    color: "#f55449",
                                                                    fontSize: "0.7rem",
                                                                    height: 20,
                                                                }}
                                                            />
                                                        )}
                                                    </Stack>
                                                </Box>

                                                <Box sx={{ textAlign: "right" }}>
                                                    <Typography variant="body2" fontWeight={700} color="#0f1f38">
                                                        ${finalTotal.toFixed(2)}
                                                    </Typography>
                                                    {tieneDescuento && (
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{ textDecoration: "line-through", display: "block" }}
                                                        >
                                                            ${originalTotal.toFixed(2)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </ListItem>
                                        );
                                    })}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Box>
                                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.5 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Subtotal:
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                            ${totalOriginal.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                    {ahorro > 0 && (
                                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 0.5 }}>
                                            <Typography variant="body2" color="success.main">
                                                Descuento:
                                            </Typography>
                                            <Typography variant="body2" color="success.main" fontWeight={500}>
                                                -${ahorro.toFixed(2)}
                                            </Typography>
                                        </Stack>
                                    )}
                                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mt: 1 }}>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Total:
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                            ${totalConDescuento.toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Paper>
                        );
                    })
                )}
            </Box>
        </Drawer>
    );
}

export default DrawerCarritos;