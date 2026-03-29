import { Container, Row, Col, Form, Button, InputGroup, Alert } from "react-bootstrap";
import TablaBase from "../../../components/TablaBase";
import PaginacionTabla from "../../../components/PaginacionTabla";
import ProductoModal from "../components/ProductoModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useGestionProductos } from "../hook/useGestionProductos";

function Productos() {
    const {
        textoBusqueda, setTextoBusqueda,
        categoriaSeleccionada, setCategoriaSeleccionada,
        productosFiltrados, categorias,
        cargando, error, total, pagina, limite,
        ordenarPor, direccionOrden,
        modalAbierto, productoEditar,
        confirmacionAbierta, productoAEliminar,
        ordenarRatingAsc, ordenarRatingDesc,
        ordenarPrecioAsc, ordenarPrecioDesc,
        ordenarStockAsc, ordenarStockDesc,
        limpiarFiltros,
        manejarNuevo, manejarEditar,
        manejarClickEliminar, manejarConfirmarEliminar,
        manejarCancelarEliminar, manejarCerrarModal,
        manejarCambiarPagina, manejarCambiarFilasPorPagina,
    } = useGestionProductos();

    const renderFila = (producto) => (
        <>
            <td>{producto.title}</td>
            <td>{producto.category}</td>
            <td>${producto.price.toFixed(2)}</td>
            <td>{producto.stock}</td>
            <td>{producto.rating}</td>
            <td>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => manejarEditar(producto)}
                    className="me-1"
                >
                    <i className="bi bi-pencil"></i>
                </Button>

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => manejarClickEliminar(producto)}
                >
                    <i className="bi bi-trash"></i>
                </Button>
            </td>
        </>
    );

    const isActiveOrder = (campo, direccion) =>
        ordenarPor === campo && direccionOrden === direccion;

    return (
        <Container fluid>
            <div className="d-flex justify-content-end mb-4">
                <Button
                    variant="danger"
                    onClick={manejarNuevo}
                    style={{ backgroundColor: "#f55449", borderColor: "#f55449" }}
                >
                    <i className="bi bi-plus-lg me-1"></i>
                    Nuevo Producto
                </Button>
            </div>

            <div className="bg-white p-3 rounded-3 border mb-4" style={{ borderColor: "#e0e4e8" }}>
                <Row className="g-2">
                    <Col md={6}>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-search" style={{ color: "#8e7970" }}></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Buscar por nombre"
                                value={textoBusqueda}
                                onChange={(e) => setTextoBusqueda(e.target.value)}
                            />
                        </InputGroup>
                    </Col>

                    <Col md={4}>
                        <Form.Select
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            style={{ borderRadius: "8px" }}
                        >
                            <option value="">Todas las categorías</option>
                            {categorias?.map((c) => (
                                <option key={c.slug} value={c.slug}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Button
                            variant="outline-secondary"
                            onClick={limpiarFiltros}
                            className="w-100"
                        >
                            <i className="bi bi-x-circle me-1"></i>
                            Limpiar filtros
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="bg-white p-3 rounded-3 border mb-4" style={{ borderColor: "#e0e4e8" }}>
                <h6 className="text-center mb-3 fw-semibold" style={{ color: "#0f1f38" }}>
                    Ordenar por
                </h6>

                <div className="d-flex flex-wrap justify-content-center gap-4">

                    <div className="text-center">
                        <div className="small text-secondary">Rating</div>
                        <div className="d-flex gap-1">
                            <Button
                                size="sm"
                                variant={isActiveOrder("rating", "desc") ? "danger" : "outline-secondary"}
                                onClick={ordenarRatingDesc}
                            >
                                <i className="bi bi-arrow-down"></i> Mayor a menor
                            </Button>

                            <Button
                                size="sm"
                                variant={isActiveOrder("rating", "asc") ? "danger" : "outline-secondary"}
                                onClick={ordenarRatingAsc}
                            >
                                <i className="bi bi-arrow-up"></i> Menor a mayor
                            </Button>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="small text-secondary">Precio</div>
                        <div className="d-flex gap-1">
                            <Button
                                size="sm"
                                variant={isActiveOrder("price", "desc") ? "danger" : "outline-secondary"}
                                onClick={ordenarPrecioDesc}
                            >
                                <i className="bi bi-arrow-down"></i> Mayor a menor
                            </Button>

                            <Button
                                size="sm"
                                variant={isActiveOrder("price", "asc") ? "danger" : "outline-secondary"}
                                onClick={ordenarPrecioAsc}
                            >
                                <i className="bi bi-arrow-up"></i> Menor a mayor
                            </Button>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="small text-secondary">Stock</div>
                        <div className="d-flex gap-1">
                            <Button
                                size="sm"
                                variant={isActiveOrder("stock", "desc") ? "danger" : "outline-secondary"}
                                onClick={ordenarStockDesc}
                            >
                                <i className="bi bi-arrow-down"></i> Mayor a menor
                            </Button>

                            <Button
                                size="sm"
                                variant={isActiveOrder("stock", "asc") ? "danger" : "outline-secondary"}
                                onClick={ordenarStockAsc}
                            >
                                <i className="bi bi-arrow-up"></i> Menor a mayor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <TablaBase
                columnas={["Nombre", "Categoría", "Precio", "Stock", "Rating", "Acciones"]}
                datos={productosFiltrados}
                renderFila={renderFila}
                pagina={pagina}
                filasPorPagina={limite}
                loading={cargando}
            />

            {!cargando && !error && productosFiltrados.length > 0 && (
                <>
                    <div className="text-secondary mb-2">{total} resultados</div>
                    <PaginacionTabla
                        total={total}
                        pagina={pagina}
                        filasPorPagina={limite}
                        onChangePagina={manejarCambiarPagina}
                        onChangeFilas={manejarCambiarFilasPorPagina}
                    />
                </>
            )}

            {error && (
                <Alert variant="danger">
                    Error al cargar productos. Intenta de nuevo.
                </Alert>
            )}

            {!cargando && !error && productosFiltrados.length === 0 && (
                <Alert variant="info">No hay productos</Alert>
            )}

            <ProductoModal
                abierto={modalAbierto}
                alCerrar={manejarCerrarModal}
                producto={productoEditar}
            />

            <ConfirmDialog
                abierto={confirmacionAbierta}
                titulo="Eliminar producto"
                mensaje={`¿Eliminar "${productoAEliminar?.title}"?`}
                alConfirmar={manejarConfirmarEliminar}
                alCancelar={manejarCancelarEliminar}
            />
        </Container>
    );
}

export default Productos;