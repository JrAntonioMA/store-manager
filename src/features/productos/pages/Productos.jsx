import React from "react";
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Paper,
    IconButton,
    Button,
    CircularProgress,
    TableCell,
    TableSortLabel,
    Alert,
    InputAdornment,
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import TablaBase from "../../../components/TablaBase";
import PaginacionTabla from "../../../components/PaginacionTabla";
import ProductoModal from "../components/ProductoModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useGestionProductos } from "../hook/useGestionProductos";

function Productos() {
    const {
        textoBusqueda,
        setTextoBusqueda,
        categoriaSeleccionada,
        setCategoriaSeleccionada,
        productosFiltrados,
        categorias,
        cargando,
        error,
        total,
        pagina,
        limite,
        ordenarPor,
        direccionOrden,
        modalAbierto,
        productoEditar,
        confirmacionAbierta,
        productoAEliminar,
        manejarOrden,
        manejarNuevo,
        manejarEditar,
        manejarClickEliminar,
        manejarConfirmarEliminar,
        manejarCancelarEliminar,
        manejarCerrarModal,
        manejarCambiarPagina,
    } = useGestionProductos();

    const renderFila = (producto) => (
        <>
            <TableCell>{producto.title}</TableCell>
            <TableCell>{producto.category}</TableCell>
            <TableCell>${producto.price}</TableCell>
            <TableCell>{producto.stock}</TableCell>
            <TableCell>{producto.rating}</TableCell>
            <TableCell>
                <IconButton size="small" onClick={() => manejarEditar(producto)}>
                    <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => manejarClickEliminar(producto)}>
                    <Delete fontSize="small" />
                </IconButton>
            </TableCell>
        </>
    );

    if (cargando) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress sx={{ color: "#f55449" }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error">Error al cargar productos. Intenta de nuevo.</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h5" fontWeight={600} sx={{ color: "#0f1f38" }}>
                    Productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={manejarNuevo}
                    sx={{ bgcolor: "#f55449", "&:hover": { bgcolor: "#e04439" } }}
                >
                    Nuevo Producto
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <TextField
                        placeholder="Buscar productos..."
                        variant="outlined"
                        size="small"
                        value={textoBusqueda}
                        onChange={(e) => setTextoBusqueda(e.target.value)}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: "#8e7970", fontSize: "1.2rem" }} />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2 },
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={categoriaSeleccionada}
                            label="Categoría"
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            <MenuItem value="">Todas</MenuItem>
                            {categorias?.map((cat) => (
                                <MenuItem key={cat.slug} value={cat.slug}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            <TablaBase
                columnas={[
                    "Nombre",
                    "Categoría",
                    <TableSortLabel
                        active={ordenarPor === "price"}
                        direction={direccionOrden}
                        onClick={() => manejarOrden("price")}
                    >
                        Precio
                    </TableSortLabel>,
                    "Stock",
                    <TableSortLabel
                        active={ordenarPor === "rating"}
                        direction={direccionOrden}
                        onClick={() => manejarOrden("rating")}
                    >
                        Rating
                    </TableSortLabel>,
                    "Acciones",
                ]}
                datos={productosFiltrados}
                renderFila={renderFila}
                mostrarNumeracion
                pagina={pagina}
                filasPorPagina={limite}
            />

            <PaginacionTabla
                total={total}
                pagina={pagina}
                filasPorPagina={limite}
                onChangePagina={manejarCambiarPagina}
                onChangeFilas={() => { }}
            />

            <ProductoModal
                abierto={modalAbierto}
                alCerrar={manejarCerrarModal}
                producto={productoEditar}
            />

            <ConfirmDialog
                abierto={confirmacionAbierta}
                titulo="Eliminar producto"
                mensaje={`¿Estás seguro de que deseas eliminar "${productoAEliminar?.title}"?`}
                alConfirmar={manejarConfirmarEliminar}
                alCancelar={manejarCancelarEliminar}
                textoConfirmar="Eliminar"
                textoCancelar="Cancelar"
            />
        </Box>
    );
}

export default Productos;