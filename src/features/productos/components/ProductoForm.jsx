import React from "react";
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Switch,
    FormControlLabel,
    Typography,
    IconButton,
    Alert,
    CircularProgress,
    Divider,
    Paper,
    Card,
    CardContent,
    InputAdornment,
} from "@mui/material";
import {
    Add,
    Delete,
    Inventory,
    Category,
    AttachMoney,
    Percent,
    Sell,
    Storefront,
    Style,
} from "@mui/icons-material";
import ConfirmDialog from "../components/ConfirmDialog";
import { useFormularioProducto } from "../hook/useFormularioProducto";

function ProductoForm({ producto, alExito, alCancelar, alCambioSinGuardar }) {
    const {
        form,
        categorias,
        categoriasCargando,
        dialogos,
        estados,
        fields,
        append,
        remove,
        tieneNombresVariantesDuplicados,
        onSubmit,
    } = useFormularioProducto({ producto, alExito, alCambioSinGuardar });

    const { register, setValue } = form;
    const { errors, isDirty, isValid, touchedFields } = estados;
    const { borradorAbierto, manejarRecuperarBorrador, manejarCancelarBorrador } = dialogos;

    const estilosInput = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f55449", borderWidth: 2 },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f55449" },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "#f55449" },
    };

    if (categoriasCargando) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress sx={{ color: "#f55449" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
            <Paper
                elevation={2}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": { boxShadow: 6 },
                }}
            >
                <Box
                    sx={{
                        px: 4,
                        py: 3,
                        background: `linear-gradient(135deg, #0f1f38 0%, #1a2c4a 100%)`,
                        color: "white",
                    }}
                >
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                        {estados.esEdicion ? "Editar producto" : "Nuevo producto"}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {estados.esEdicion
                            ? "Actualiza los datos del producto"
                            : "Completa la información para agregar un nuevo producto"}
                    </Typography>
                </Box>

                <Box sx={{ p: 4 }}>
                    <form onSubmit={onSubmit}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 5 }}>
                            <TextField
                                fullWidth
                                label="Nombre del producto *"
                                {...register("title")}
                                error={!!errors.title && touchedFields.title}
                                helperText={touchedFields.title && errors.title?.message}
                                variant="outlined"
                                sx={estilosInput}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Storefront sx={{ color: "#8e7970" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <FormControl fullWidth error={!!errors.category && touchedFields.category}>
                                <InputLabel>Categoría *</InputLabel>
                                <Select
                                    label="Categoría *"
                                    {...register("category")}
                                    sx={{
                                        borderRadius: 2,
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#f55449" },
                                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#f55449" },
                                    }}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Category sx={{ color: "#8e7970", mr: 1 }} />
                                        </InputAdornment>
                                    }
                                >
                                    {categorias?.map((cat) => (
                                        <MenuItem key={cat.slug} value={cat.slug}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{touchedFields.category && errors.category?.message}</FormHelperText>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estados.estadoDisponibilidad === "in-stock"}
                                        onChange={(e) =>
                                            setValue("availabilityStatus", e.target.checked ? "in-stock" : "out-of-stock")
                                        }
                                        sx={{
                                            "& .MuiSwitch-switchBase.Mui-checked": { color: "#f55449" },
                                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#f55449" },
                                        }}
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {estados.estadoDisponibilidad === "in-stock" ? "Producto en venta" : "Producto descontinuado"}
                                    </Typography>
                                }
                            />

                            <TextField
                                fullWidth
                                label="Precio base *"
                                type="number"
                                step="0.01"
                                {...register("price", { valueAsNumber: true })}
                                error={!!errors.price && touchedFields.price}
                                helperText={touchedFields.price && errors.price?.message}
                                variant="outlined"
                                sx={estilosInput}
                                inputProps={{ min: 0 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AttachMoney sx={{ color: "#8e7970" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Stock total *"
                                type="number"
                                step={1}
                                {...register("stock", { valueAsNumber: true })}
                                error={!!errors.stock && touchedFields.stock}
                                helperText={touchedFields.stock && errors.stock?.message}
                                disabled={estados.stockDeshabilitado}
                                variant="outlined"
                                sx={estilosInput}
                                inputProps={{ min: 0 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Inventory sx={{ color: "#8e7970" }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box>
                                <TextField
                                    fullWidth
                                    label="Descuento (%)"
                                    type="number"
                                    step="0.1"
                                    {...register("discountPercentage", { valueAsNumber: true })}
                                    error={!!errors.discountPercentage}
                                    helperText={errors.discountPercentage?.message}
                                    variant="outlined"
                                    sx={estilosInput}
                                    inputProps={{ min: 0, max: 100 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Percent sx={{ color: "#8e7970" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {estados.advertenciaDescuento && (
                                    <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, py: 0 }}>
                                        Descuento superior al 50%
                                    </Alert>
                                )}

                                <Box
                                    sx={{
                                        mt: 2,
                                        p: 2,
                                        bgcolor: "#fafbfc",
                                        borderRadius: 2,
                                        border: "1px solid #e0e4e8",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="body2" sx={{ color: "#8e7970" }}>
                                        Precio final
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: "#f55449", fontWeight: 600 }}>
                                        ${estados.precioFinal.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: "#e0e4e8" }} />

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: "#0f1f38" }}>
                                Variantes
                            </Typography>
                            <Typography variant="caption" sx={{ mb: 2, display: "block", color: "#8e7970" }}>
                                Agrega variantes como tallas, colores, etc. (mínimo 1, máximo 5)
                            </Typography>

                            {fields.map((field, index) => (
                                <Card
                                    key={field.id}
                                    variant="outlined"
                                    sx={{
                                        mb: 2,
                                        borderRadius: 3,
                                        borderColor: "#e0e4e8",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#f55449",
                                            boxShadow: "0 4px 12px rgba(245,84,73,0.1)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                                            <IconButton
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                                sx={{ color: "#8e7970", "&:hover": { color: "#f55449" } }}
                                                size="small"
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                            <TextField
                                                fullWidth
                                                label="Nombre de la variante"
                                                {...register(`variants.${index}.name`)}
                                                error={!!errors.variants?.[index]?.name}
                                                helperText={errors.variants?.[index]?.name?.message}
                                                variant="outlined"
                                                size="small"
                                                sx={estilosInput}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Style sx={{ color: "#8e7970" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                label="Precio"
                                                type="number"
                                                step="0.01"
                                                {...register(`variants.${index}.price`, { valueAsNumber: true })}
                                                error={!!errors.variants?.[index]?.price}
                                                helperText={errors.variants?.[index]?.price?.message}
                                                variant="outlined"
                                                size="small"
                                                sx={estilosInput}
                                                inputProps={{ min: 0 }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Sell sx={{ color: "#8e7970" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <TextField
                                                fullWidth
                                                label="Stock"
                                                type="number"
                                                step={1}
                                                {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                                                error={!!errors.variants?.[index]?.stock}
                                                helperText={errors.variants?.[index]?.stock?.message}
                                                disabled={estados.stockDeshabilitado}
                                                variant="outlined"
                                                size="small"
                                                sx={estilosInput}
                                                inputProps={{ min: 0 }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Inventory sx={{ color: "#8e7970" }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}

                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => append({ name: "", price: 0, stock: 0 })}
                                disabled={fields.length >= 5}
                                sx={{
                                    mt: 1,
                                    textTransform: "none",
                                    borderColor: "#f55449",
                                    color: "#f55449",
                                    borderRadius: 2,
                                    "&:hover": {
                                        borderColor: "#e04439",
                                        backgroundColor: "#f5544910",
                                        transform: "translateY(-1px)",
                                    },
                                    transition: "all 0.2s ease",
                                }}
                            >
                                Agregar variante
                            </Button>

                            {tieneNombresVariantesDuplicados() && (
                                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                                    No puede haber dos variantes con el mismo nombre.
                                </Alert>
                            )}
                            {errors.variants?.message && (
                                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                                    {errors.variants.message}
                                </Alert>
                            )}
                            {errors.stock?.message && (
                                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                                    {errors.stock.message}
                                </Alert>
                            )}
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                            <Button
                                onClick={alCancelar}
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    borderColor: "#e0e4e8",
                                    color: "#8e7970",
                                    borderRadius: 2,
                                    px: 3,
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        borderColor: "#f55449",
                                        backgroundColor: "#f5544910",
                                        transform: "translateY(-1px)",
                                    },
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!isValid || (estados.esEdicion && !isDirty) || tieneNombresVariantesDuplicados()}
                                sx={{
                                    bgcolor: "#f55449",
                                    "&:hover": {
                                        bgcolor: "#e04439",
                                        transform: "translateY(-1px)",
                                        boxShadow: "0 4px 12px rgba(245,84,73,0.3)",
                                    },
                                    textTransform: "none",
                                    borderRadius: 2,
                                    px: 4,
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {estados.esEdicion ? "Actualizar producto" : "Crear producto"}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper>

            <ConfirmDialog
                abierto={borradorAbierto}
                titulo="Borrador guardado"
                mensaje="Hay un borrador guardado. ¿Deseas recuperarlo?"
                alConfirmar={manejarRecuperarBorrador}
                alCancelar={manejarCancelarBorrador}
                textoConfirmar="Recuperar"
                textoCancelar="Descartar"
            />
        </Box>
    );
}

export default ProductoForm;